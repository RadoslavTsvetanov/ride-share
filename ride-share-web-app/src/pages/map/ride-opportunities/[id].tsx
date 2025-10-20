import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Map from '~/components/Map';
import type { Coordinate } from '~/types/main';
import { api } from "~/utils/api";
import { useSearchPlace } from '~/components/SearchPlace';


const isTheCompamyViewingIT = true

export default function RideOpportunityDetail() {
  // stops are hardcoded for now 
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const [hasVoted, setHasVoted] = useState(false);
  const [voteStatus, setVoteStatus] = useState<boolean | null>(null);
  const rideOpportunityData = api.post.getRideOpportunityData.useQuery(
    { rideOpportunityId: String(id) },
    { enabled: !!id }
  );



  useEffect(() => {
    const fetchLocations = async () => {
      const stops = rideOpportunityData?.data?.stops || [];
      for (const [index, stop] of stops.entries()) {
        try {
          // Add delay between requests (1000ms = 1 second)
          await new Promise(resolve => setTimeout(resolve, 1000 * index));
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${stop[0]}&lon=${stop[1]}`,
            {
              headers: {
                'User-Agent': 'RideShareApp/1.0 (your-email@example.com)',
                'Accept-Language': 'en'
              }
            }
          );
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log(`Stop ${index + 1} location:`, data.display_name);
          
          // Update the locationsOfStops state with the new location data
          setLocationsOfStops((prev: string[]) => {
            const newLocations = [...prev];
            newLocations[index] = data.display_name;
            return newLocations;
          });
          
        } catch (error) {
          console.error(`Error fetching location for stop ${index + 1}:`, error);
        }
      }
    };

    if (rideOpportunityData?.data?.stops) {
      void fetchLocations();
    }
  }, [rideOpportunityData]);

  const [locationsOfStops, setLocationsOfStops] = useState<string[]>([])
  const voteMutation = api.post.addPassengerToRideOpportunity.useMutation({
    onSuccess: (data) => {
      setHasVoted(true);
    },
  });

  const handleVote = () => {
    if (!id) return;
    voteMutation.mutate({
      rideOpportunityId: String(id),
      passengerId: "cmgy7g0f50000sbw1bcy6db25", 
    });
  };

  if (!id) {
    return <div style={{ padding: '24px' }}>Loading...</div>;
  }

  if (rideOpportunityData.isLoading) {
    return <div style={{ padding: '24px' }}>Loading ride opportunity...</div>;
  }

  if (!rideOpportunityData.data) {
    return <div style={{ padding: '24px' }}>Ride opportunity not found.</div>;
  }

  const opportunity = rideOpportunityData.data;
  
  // Parse stops from JSON
  let stops: Coordinate[] = [];
  if (opportunity.stops) {
    try {
      stops = typeof opportunity.stops === 'string' 
        ? JSON.parse(opportunity.stops) 
        : opportunity.stops as any;
    } catch (e) {
      console.error('Error parsing stops:', e);
    }
  }

  const companyName = opportunity.driver?.userDetails?.name || "Unknown Company";
  const companySlug = encodeURIComponent(companyName.toLowerCase().replace(/\s+/g, '-'));

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
            Ride Opportunity Details
          </h1>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
            ID: {opportunity.id}
          </div>

          {/* Company Link */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Organized by:</span>
            <Link 
              href={`/companies/${companySlug}`}
              style={{
                color: '#2196F3',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {companyName} →
            </Link>
          </div>

          {/* Arrival Time */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Arrival Time:</span>
            <span>{new Date(opportunity.arrivalTime).toLocaleString()}</span>
          </div>

          <div>
            Price: {opportunity.price}
          </div>

          {/* Vote Buttons */}
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>Are you interested?</h3>
            {!hasVoted ? (
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => handleVote(true)}
                  disabled={voteMutation.isPending}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: voteMutation.isPending ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  Join
                </button>
              </div>
            ) : (
              <div style={{
                padding: '12px',
                backgroundColor: voteStatus ? '#e8f5e9' : '#ffebee',
                color: voteStatus ? '#2e7d32' : '#c62828',
                borderRadius: '8px',
                fontWeight: 'bold',
              }}>
              </div>
            )}
          </div>
        </div>

        {/* Route Information */}
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Route Information</h2>
          
          <div style={{ marginBottom: '16px' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '16px',
              marginBottom: '16px' 
            }}>
              <div>
                <strong>Start Point:</strong>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  ({opportunity.startLat.toFixed(6)}, {opportunity.startLng.toFixed(6)})
                </div>
              </div>
              <div>
                <strong>End Point:</strong>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  ({opportunity.endLat.toFixed(6)}, {opportunity.endLng.toFixed(6)})
                </div>
              </div>
            </div>

            <div>
              <strong>Total Stops:</strong> {stops.length}
            </div>
          </div>

          {/* Stops List */}
          {stops.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>All Stops:</h3>
              <div style={{ 
                maxHeight: '200px', 
                overflow: 'auto',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '12px'
              }}>
                {stops.map((stop, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: '8px',
                      marginBottom: '4px',
                      backgroundColor: index === 0 ? '#e8f5e9' : index === stops.length - 1 ? '#ffebee' : '#f5f5f5',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                  >
                    <h1>{locationsOfStops[index]} Loading ....</h1>
                    <strong>
                      {index === 0 ? '🟢 Start' : index === stops.length - 1 ? '🔴 End' : `⚪ Stop ${index}`}:
                    </strong>{' '}
                    (({stop[0].toFixed(6)}, {stop[1].toFixed(6)}))
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      Estimated arrival: {new Date(opportunity.arrivalTime).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Participants Section */}
        {isTheCompamyViewingIT && opportunity.participants && opportunity.participants.length > 0 && (
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Participants ({opportunity.participants.length})</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {opportunity.participants.map((participant) => (
                <div 
                  key={participant.id}
                  style={{
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '18px',
                  }}>
                    {participant.userDetails?.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    <a href={`/users/${participant.id}`}>{participant.userDetails?.name || 'Unknown'}</a>
                    </div>
                    
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {participant.userDetails?.email || ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
          }}
        >
          ← Back to All Opportunities
        </button>
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Route Map</h2>
          <div style={{ height: '500px', width: '100%' }}>
            <Map 
              width={600} 
              height={500} 
              center={stops.length > 0 ? stops[0] : [opportunity.startLat, opportunity.startLng]} 
              zoom={10}
            >
              {({ TileLayer, Marker, Popup, Polyline }) => (
                <>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  />

                  {stops.map((stop, index) => (
                    <Marker key={index} position={stop}>
                      <Popup>
                        <strong>
                          {index === 0 ? 'Start Point' : index === stops.length - 1 ? 'End Point' : `Stop ${index}`}
                        </strong><br />
                        Lat: {stop[0].toFixed(6)}<br />
                        Lng: {stop[1].toFixed(6)}<br />
                        Arrival: {new Date(opportunity.arrivalTime).toLocaleString()}
                      </Popup>
                    </Marker>
                  ))}

                  {stops.length > 1 && (
                    <Polyline 
                      positions={stops} 
                      color="#2196F3" 
                      weight={4}
                      opacity={0.7}
                    />
                  )}
                </>
              )}
            </Map>
          </div>
        </div>

      </div>
    </div>
  );
}