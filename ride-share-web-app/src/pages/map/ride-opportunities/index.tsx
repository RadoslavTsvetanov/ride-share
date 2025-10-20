import type { RideOpportunity } from '@prisma/client';
import React, { useState, useEffect } from 'react';

import Map from '~/components/Map';
import { Route } from '~/components/Route';
import type { Coordinate } from '~/types/main';

const DEFAULT_CENTER: [number, number] = [38.907132, -77.036546]

import { api } from "~/utils/api";

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

  const rides = api.post.getRidesOpportunities.useQuery();
  const createRideOpportunityMutation = api.post.createRideOpportunity.useMutation({
    onSuccess: () => {
      // Reset form and close modal
      setIsModalOpen(false);
      setIsPlacingStops(false);
      setStops([]);
      setArrivalTime("");
      // Refetch rides to show the new one
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
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsPlacingStops(false);
    setStops([]);
    setArrivalTime("");
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          + Create New Ride Opportunity
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

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Arrival Time:
              </label>
              <input 
                type="datetime-local" 
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                }}
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

            {/* Debug info */}
            <div style={{ 
              padding: '8px', 
              backgroundColor: '#f0f0f0', 
              borderRadius: '4px', 
              fontSize: '12px',
              marginBottom: '12px'
            }}>
              <div>Stops: {stops.length} {stops.length >= 2 ? '✓' : '✗ (need at least 2)'}</div>
              <div>Arrival Time: {arrivalTime ? '✓' : '✗ (required)'}</div>
              <div>Ready: {stops.length >= 2 && arrivalTime ? '✓ Yes' : '✗ No'}</div>
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
                disabled={stops.length < 2 || !arrivalTime || createRideOpportunityMutation.isPending}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: stops.length >= 2 && arrivalTime ? '#4CAF50' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: stops.length >= 2 && arrivalTime ? 'pointer' : 'not-allowed',
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

      <Map width="800" height="400" center={userLocation} zoom={12}>
        {({ TileLayer, Marker, Popup, Polyline }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />

            <MapClickHandler 
              isPlacingStops={isPlacingStops} 
              onMapClick={handleMapClick}
            />

            {/* Render existing ride opportunities */}
            {rides?.data?.map((ride) => (
              <Route key={ride.id} routeData={ride} others={{ TileLayer, Marker, Popup, Polyline }} />
            ))}

            {/* Render stops being placed */}
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