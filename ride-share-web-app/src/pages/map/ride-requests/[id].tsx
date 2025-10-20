import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Map from '~/components/Map';
import type { Coordinate } from '~/types/main';
import { api } from "~/utils/api";

const cardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '16px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '16px',
  marginTop: 0,
};

// OpenRouter AI integration
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || 'your-api-key-here';

interface AIMatch {
  opportunity: any;
  matchScore: number;
  startDistance: number;
  endDistance: number;
}

async function getOpenRouterAISuggestions(rideRequest: any, rideOpportunities: any[]): Promise<AIMatch[]> {
  const prompt = `
You are an AI ride-sharing matchmaker. Given a ride request and available ride opportunities, find the best matches.

RIDE REQUEST:
- Start: (${rideRequest.startLat}, ${rideRequest.startLng})
- End: (${rideRequest.endLat}, ${rideRequest.endLng})
- Requested time: ${rideRequest.arrivalTime}

AVAILABLE OPPORTUNITIES:
${rideOpportunities.map((opp, i) => `
${i + 1}. ${opp.driver?.userDetails?.name || 'Unknown Driver'}
   - Route: (${opp.startLat}, ${opp.startLng}) → (${opp.endLat}, ${opp.endLng})
   - Price: $${opp.price}/mile
   - Stops: ${opp.stops ? JSON.stringify(opp.stops) : 'Direct route'}
   - Time: ${opp.arrivalTime}
`).join('\n')}

Please analyze these routes and return a JSON array of the top 5 matches ranked by how well they overlap with the ride request route. Consider:

1. Distance from request start/end points to opportunity route segments
2. Overall route similarity
3. Price competitiveness
4. Time compatibility

Return only a JSON array with this exact format:
[
  {
    "opportunityIndex": 1,
    "matchScore": 85,
    "reasoning": "Brief explanation of why this is a good match",
    "startDistance": 2.1,
    "endDistance": 1.8
  }
]

Where opportunityIndex corresponds to the numbered opportunities above (1-based).
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
        model: 'anthropic/claude-3.5-sonnet',
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

export default function RideRequestDetail() {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AIMatch[]>([]);

  const rideRequestData = api.post.getRideRequests.useQuery();
  const rideOpportunities = api.post.getRidesOpportunities.useQuery();

  if (!id) {
    return <div style={{ padding: '24px' }}>Loading...</div>;
  }

  const rideRequest = rideRequestData.data?.find(r => r.id === id);

  if (rideRequestData.isLoading || rideOpportunities.isLoading) {
    return <div style={{ padding: '24px' }}>Loading ride request...</div>;
  }

  if (!rideRequest) {
    return <div style={{ padding: '24px' }}>Ride request not found.</div>;
  }

  const handleGetAISuggestions = async () => {
    setAiLoading(true);
    setShowSuggestions(true);

    try {
      if (!rideOpportunities.data) {
        throw new Error('No ride opportunities available');
      }

      const suggestions = await getOpenRouterAISuggestions(rideRequest, rideOpportunities.data);
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

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={cardStyle}>
          <h1 style={{ marginTop: 0, marginBottom: '8px', fontSize: '28px' }}>
            Ride Request Details
          </h1>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
            ID: {rideRequest.id}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Requested by:</span>
            <Link
              href={`/users/${rideRequest.passenger.id}`}
              style={{
                color: '#2196F3',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {rideRequest.passenger.userDetails?.name || 'Unknown'} →
            </Link>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Desired Arrival Time:</span>
            <span>{new Date(rideRequest.arrivalTime).toLocaleString()}</span>
          </div>

          {/* AI Suggestion Button */}
          <button
            onClick={handleGetAISuggestions}
            disabled={aiLoading}
            style={{
              padding: '12px 24px',
              backgroundColor: '#9C27B0',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: aiLoading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>🤖</span>
            {aiLoading ? 'Analyzing Routes...' : 'Get AI Suggestions'}
          </button>
        </div>

        {/* Route Information */}
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Route Information</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div>
              <strong>Start Point:</strong>
              <div style={{ color: '#666', fontSize: '14px' }}>
                ({rideRequest.startLat.toFixed(6)}, {rideRequest.startLng.toFixed(6)})
              </div>
            </div>
            <div>
              <strong>End Point:</strong>
              <div style={{ color: '#666', fontSize: '14px' }}>
                ({rideRequest.endLat.toFixed(6)}, {rideRequest.endLng.toFixed(6)})
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Route Map</h2>
          <div style={{ height: '400px', width: '100%' }}>
            <Map
              width={600}
              height={400}
              center={[rideRequest.startLat, rideRequest.startLng]}
              zoom={12}
            >
              {({ TileLayer, Marker, Popup, Polyline }: any) => (
                <>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  />

                  <Marker position={[rideRequest.startLat, rideRequest.startLng]}>
                    <Popup>
                      <strong>Start Point</strong><br />
                      Lat: {rideRequest.startLat.toFixed(6)}<br />
                      Lng: {rideRequest.startLng.toFixed(6)}
                    </Popup>
                  </Marker>

                  <Marker position={[rideRequest.endLat, rideRequest.endLng]}>
                    <Popup>
                      <strong>End Point</strong><br />
                      Lat: {rideRequest.endLat.toFixed(6)}<br />
                      Lng: {rideRequest.endLng.toFixed(6)}
                    </Popup>
                  </Marker>

                  <Polyline
                    positions={[
                      [rideRequest.startLat, rideRequest.startLng],
                      [rideRequest.endLat, rideRequest.endLng]
                    ]}
                    color="#9C27B0"
                    weight={4}
                    opacity={0.7}
                    dashArray="10, 10"
                  />
                </>
              )}
            </Map>
          </div>
        </div>

        {/* AI Suggestions */}
        {showSuggestions && (
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>
              🤖 AI Suggested Ride Opportunities
            </h2>

            {aiLoading && (
              <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>
                🤖 AI is analyzing routes and finding the best matches...
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
                      <Link
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
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#757575',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          ← Back to All Requests
        </button>
      </div>
    </div>
  );
}