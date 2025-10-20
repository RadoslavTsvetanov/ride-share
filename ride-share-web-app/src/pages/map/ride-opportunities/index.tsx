import React, { useState, useEffect, useMemo } from 'react';
import type { Coordinate } from '~/types/main';
import { api } from "~/utils/api";
import Map from '~/components/Map';
import { Route } from '~/components/Route';
import { useSearchPlace } from '~/components/SearchPlace';

const DEFAULT_CENTER: [number, number] = [38.907132, -77.036546];

// Styles
const styles = {
  button: {
    padding: '12px 24px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: '16px',
  },
};

// OpenRouter AI integration
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || 'your-api-key-here';

interface AIMatch {
  opportunity: any;
  matchScore: number;
  startDistance: number;
  endDistance: number;
}

async function getOpenRouterAISuggestions(rideRequests: any[], rideOpportunities: any[]): Promise<AIMatch[]> {
  if (rideRequests.length === 0) {
    return [];
  }

  const prompt = `
You are an AI ride-sharing matchmaker. Given ride requests and available ride opportunities, find the best matches for each request.

USER'S RIDE REQUESTS:
${rideRequests.map((req, i) => `
${i + 1}. Request ${req.id.slice(0, 8)}
   - Start: (${req.startLat}, ${req.startLng})
   - End: (${req.endLat}, ${req.endLng})
   - Time: ${req.arrivalTime}
`).join('\n')}

AVAILABLE OPPORTUNITIES:
${rideOpportunities.map((opp, i) => `
${i + 1}. ${opp.driver?.userDetails?.name || 'Unknown Driver'}
   - Route: (${opp.startLat}, ${opp.startLng}) → (${opp.endLat}, ${opp.endLng})
   - Price: $${opp.price}/mile
   - Stops: ${opp.stops ? JSON.stringify(opp.stops) : 'Direct route'}
   - Time: ${opp.arrivalTime}
`).join('\n')}

Please analyze these routes and return a JSON array of the top 5 matches across all requests. Consider:

1. Distance from request start/end points to opportunity route segments
2. Overall route similarity
3. Price competitiveness
4. Time compatibility
5. How well the opportunity serves multiple requests

Return only a JSON array with this exact format:
[
  {
    "opportunityIndex": 1,
    "matchScore": 85,
    "reasoning": "Brief explanation of why this is a good match",
    "startDistance": 2.1,
    "endDistance": 1.8,
    "servesRequests": [1, 3]
  }
]

Where opportunityIndex corresponds to the numbered opportunities above (1-based) and servesRequests lists which request numbers this opportunity serves.
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'RideShare AI Matchmaker',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3.1:free',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response from OpenRouter');
    }

    // Extract JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const matches = JSON.parse(jsonMatch[0]);

    // Convert to our format
    return matches.map((match: any) => ({
      opportunity: rideOpportunities[match.opportunityIndex - 1],
      matchScore: match.matchScore,
      startDistance: match.startDistance,
      endDistance: match.endDistance,
    }));

  } catch (error) {
    console.error('OpenRouter AI suggestion error:', error);
    throw error;
  }
}

const MapClickHandler = ({
  isPlacingStops,
  onMapClick
}: {
  isPlacingStops: boolean;
  onMapClick: (lat: number, lng: number) => void;
}) => {
  const { useMapEvents } = require('react-leaflet');

  useMapEvents({
    click: (e: any) => {
      if (isPlacingStops) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });

  return null;
};

export default function RideOpportunities() {
  const [userLocation, setUserLocation] = useState<Coordinate>(DEFAULT_CENTER);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlacingStops, setIsPlacingStops] = useState(false);
  const [stops, setStops] = useState<Coordinate[]>([]);
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [price, setPrice] = useState<string>("1.6");
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AIMatch[]>([]);

  
  
  const rides = api.post.getRidesOpportunities.useQuery();

  const searchPlaceStart = useSearchPlace(d => {setStops(v => [...v, [Number(d.lat), Number(d.lon)]])})
  const rideRequests = api.post.getRideRequests.useQuery();
  const createRideOpportunityMutation = api.post.createRideOpportunity.useMutation({
    onSuccess: () => {
      setIsModalOpen(false);
      setIsPlacingStops(false);
      setStops([]);
      setArrivalTime("");
      setPrice("1.6");
      void rides.refetch();
    },
  });

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location: Coordinate = [latitude, longitude];
          setUserLocation(location);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    if (isPlacingStops) {
      setStops([...stops, [lat, lng]]);
    }
  };

  const handleStartPlacement = () => {
    setIsPlacingStops(true);
  };

  const handleStopPlacement = () => {
    setIsPlacingStops(false);
  };

  const handleRemoveStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleRegister = () => {
    if (stops.length < 2) {
      alert("Please add at least 2 stops (start and end)");
      return;
    }
    if (!arrivalTime) {
      alert("Please select an arrival time");
      return;
    }

    createRideOpportunityMutation.mutate({
      driverId: "cmgyvhoa40001sb312chwml7f",
      stops: stops,
      arrivalTime: arrivalTime,
      price: parseFloat(price),
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsPlacingStops(false);
    setStops([]);
    setArrivalTime("");
    setPrice("1.6");
  };

  const handleGetAISuggestions = async () => {
    setAiLoading(true);
    setShowAISuggestions(true);

    try {
      if (!rideRequests.data || !rides.data) {
        throw new Error('No ride requests or opportunities available');
      }

      const suggestions = await getOpenRouterAISuggestions(rideRequests.data, rides.data);
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Failed to get AI suggestions:', error);
      alert('Failed to get AI suggestions. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#f44336';
  };

  const isFormValid = stops.length >= 2 && arrivalTime && price;

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
        <button
          onClick={() => {setIsModalOpen(true); searchPlaceStart.setIsActive(true)}}
          style={{
            ...styles.button,
            backgroundColor: '#4CAF50',
          }}
        >
          + Create New Ride Opportunity
        </button>
        <searchPlaceStart.SearchPlace/>
        <button
          onClick={handleGetAISuggestions}
          disabled={aiLoading}
          style={{
            ...styles.button,
            backgroundColor: '#9C27B0',
          }}
        >
          <span>🤖</span>
          {aiLoading ? 'Finding Matches...' : 'Get AI Suggestions'}
        </button>
      </div>

      {isModalOpen && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          border: '2px solid #4CAF50',
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Create New Ride Opportunity</h2>

          <div style={styles.formGroup}>
            <label style={styles.label as React.CSSProperties}>
              Price ($):
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={styles.input}
              placeholder="Enter price per mile"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label as React.CSSProperties}>
              Arrival Time:
            </label>
            <input
              type="datetime-local"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontWeight: 'bold' }}>
                Stops ({stops.length}):
              </label>
              {!isPlacingStops ? (
                <button
                  onClick={handleStartPlacement}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>+</span> Add Stops
                </button>
              ) : (
                <button
                  onClick={handleStopPlacement}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#ff9800',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Stop Placing
                </button>
              )}
            </div>

            {isPlacingStops && (
              <div style={{
                padding: '12px',
                backgroundColor: '#e3f2fd',
                borderRadius: '5px',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#1976d2',
                fontWeight: 'bold',
              }}>
                📍 Click on the map below to add stops
              </div>
            )}

            <div style={{
              maxHeight: '150px',
              overflow: 'auto',
              border: '1px solid #e0e0e0',
              borderRadius: '5px',
              padding: '8px',
            }}>
              {stops.length === 0 ? (
                <div style={{ color: '#999', fontStyle: 'italic', fontSize: '14px' }}>
                  No stops added yet. Click "+ Add Stops" to begin.
                </div>
              ) : (
                stops.map((stop, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px',
                    backgroundColor: index === 0 ? '#e8f5e9' : index === stops.length - 1 ? '#ffebee' : '#f5f5f5',
                    borderRadius: '4px',
                    marginBottom: '4px',
                    fontSize: '13px',
                  }}>
                    <span>
                      <strong>{index === 0 ? '🟢 Start' : index === stops.length - 1 ? '🔴 End' : `⚪ Stop ${index}`}:</strong>{' '}
                      ({stop[0].toFixed(5)}, {stop[1].toFixed(5)})
                    </span>
                    <button
                      onClick={() => handleRemoveStop(index)}
                      style={{
                        padding: '2px 8px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={{
            padding: '8px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            fontSize: '12px',
            marginBottom: '12px'
          }}>
            <div>Stops: {stops.length} {stops.length >= 2 ? '✓' : '✗ (need at least 2)'}</div>
            <div>Price: {price ? '✓' : '✗ (required)'}</div>
            <div>Arrival Time: {arrivalTime ? '✓' : '✗ (required)'}</div>
            <div>Ready: {isFormValid ? '✓ Yes' : '✗ No'}</div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button
              onClick={handleCancel}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleRegister}
              disabled={!isFormValid || createRideOpportunityMutation.isPending}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: isFormValid ? '#4CAF50' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              {createRideOpportunityMutation.isPending ? 'Creating...' : 'Register'}
            </button>
          </div>

          {createRideOpportunityMutation.isError && (
            <div style={{
              marginTop: '12px',
              padding: '8px',
              backgroundColor: '#ffebee',
              color: '#c62828',
              borderRadius: '4px',
              fontSize: '13px',
            }}>
              Error: {createRideOpportunityMutation.error.message}
            </div>
          )}
        </div>
      )}

      {showAISuggestions && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '16px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '24px' }}>
            🤖 AI Suggested Ride Opportunities
          </h2>

          {aiLoading && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>
              🤖 AI is analyzing ride requests and finding the best matches...
            </div>
          )}

          {!aiLoading && aiSuggestions.length === 0 && (
            <div style={{
              padding: '24px',
              textAlign: 'center',
              color: '#999',
              fontStyle: 'italic'
            }}>
              No matching ride opportunities found. Try adjusting your route or check back later.
            </div>
          )}

          {aiSuggestions.length > 0 && (
            <div style={{ display: 'grid', gap: '16px' }}>
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={suggestion.opportunity.id}
                  style={{
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '12px',
                    border: `3px solid ${getMatchColor(suggestion.matchScore)}`,
                    position: 'relative',
                  }}
                >
                  {/* Match Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '20px',
                    backgroundColor: getMatchColor(suggestion.matchScore),
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}>
                    {suggestion.matchScore}% Match
                  </div>

                  {/* Rank Badge */}
                  {index === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '20px',
                      backgroundColor: '#FFD700',
                      color: '#333',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}>
                      🏆 Best Match
                    </div>
                  )}

                  <div style={{ marginTop: '12px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '12px'
                    }}>
                      <div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                          Ride Opportunity #{suggestion.opportunity.id.slice(0, 8)}
                        </h3>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                          <strong>Driver:</strong> {suggestion.opportunity.driver?.userDetails?.name || 'Unknown'}
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                          <strong>Price:</strong> ${suggestion.opportunity.price}/mile
                        </div>
                      </div>
                    </div>

                    {/* Distance Info */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      marginBottom: '16px',
                      padding: '12px',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                    }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Start Point Distance</div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2196F3' }}>
                          {suggestion.startDistance} km
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#666' }}>End Point Distance</div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2196F3' }}>
                          {suggestion.endDistance} km
                        </div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <a
                      href={`/map/ride-opportunities/${suggestion.opportunity.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <button style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }}>
                        View Details & Join →
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Map width="800" height="400" center={userLocation} zoom={12}>
        {({ TileLayer, Marker, Popup, Polyline }: any) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />

            <MapClickHandler
              isPlacingStops={isPlacingStops}
              onMapClick={handleMapClick}
            />

            {rides?.data?.map((ride) => (
              <Route key={ride.id} routeData={ride} others={{ TileLayer, Marker, Popup, Polyline }} />
            ))}

            {stops.map((stop, index) => (
              <Marker key={`new-stop-${index}`} position={stop}>
                <Popup>
                  <strong>{index === 0 ? 'Start' : index === stops.length - 1 ? 'End' : `Stop ${index}`}</strong><br />
                  Lat: {stop[0].toFixed(6)}<br />
                  Lng: {stop[1].toFixed(6)}
                </Popup>
              </Marker>
            ))}

            {/* Render polyline for new route */}
            {stops.length > 1 && (
              <Polyline
                positions={stops}
                color="green"
                weight={4}
                opacity={0.7}
                dashArray="10, 10"
              />
            )}
          </>
        )}
      </Map>
    </div>
  )
}