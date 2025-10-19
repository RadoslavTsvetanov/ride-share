
import type { RideRequest } from '@prisma/client';
import React, { useState, useEffect } from 'react';

import Map from '~/components/Map';
import { Route } from '~/components/Route';
import type { Coordinate } from '~/types/main';

const DEFAULT_CENTER: [number, number] = [38.907132, -77.036546]

import { api } from "~/utils/api";


// Component to handle map clicks
const MapClickHandler = ({ 
  isSelecting, 
  onMapClick 
}: { 
  isSelecting: boolean; 
  onMapClick: (lat: number, lng: number) => void;
}) => {
  const { useMapEvents } = require('react-leaflet');
  
  useMapEvents({
    click: (e: any) => {
      if (isSelecting) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  
  return null;
};


const useFilters = () => {
    const [timeRange, setTimeRange] = useState<{ start: Date; end: Date } | null>(null);
    const [locationRange, setLocationRange] = useState<{ start: Coordinate; end: Coordinate } | null>(null);

    return {
        timeRange: {
            value: timeRange,
            set: setTimeRange,
        },
        locationRange: {
            value: locationRange,
            set: setLocationRange,
        }
    }
}

export const ExistingRideRequests: React.FC<{comps: {
    Marker: any;
    Popup: any;
    Polyline: any;
}}> = ({comps}) => {

  const rideRequests = api.post.getRideRequests.useQuery();


  return (
    <>
                {rideRequests.data && rideRequests.data.length > 0 && rideRequests?.data?.map((rideRequest) => (
                  <React.Fragment key={rideRequest.id}>
                    <comps.Marker position={[rideRequest.startLat, rideRequest.startLng]}>
                      <comps.Popup>
                        <strong>Ride Request Start</strong><br />
                        ID: {rideRequest.id}<br />
                        Arrival Time: {rideRequest.arrivalTime}
                      </comps.Popup>
                    </comps.Marker>
                    <comps.Marker position={[rideRequest.endLat, rideRequest.endLng]}>
                      <comps.Popup>
                        <strong>Ride Request End</strong><br />
                        ID: {rideRequest.id}
                      </comps.Popup>
                    </comps.Marker>
                    <comps.Polyline 
                      positions={[[rideRequest.startLat, rideRequest.startLng], [rideRequest.endLat, rideRequest.endLng]]} 
                      color="red" 
                      weight={3}
                      opacity={0.6}
                    />
                  </React.Fragment>
                ))}
    </>
  )
}

export default function RideRequests() {
  const [userLocation, setUserLocation] = useState<Coordinate>(DEFAULT_CENTER);
  const [isSelectPopupOpen, setIsSelectPopupOpen] = useState(false);
  const [startPosition, setStartPosition] = useState<Coordinate | null>(null);
  const [endPosition, setEndPosition] = useState<Coordinate | null>(null);
  const [arrivalTime, setArrivalTime] = useState<string>("");


  const createRideRequestMutation = api.post.createRideRequest.useMutation();
  
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
          // Fallback to default center if location access is denied
        }
      );
    }

    setInterval(() => {
      setUserLocation([30.0000, 30.0000]);
    }, 5000);
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    if (startPosition === null) {
      setStartPosition([lat, lng]);
    } else if (endPosition === null) {
      setEndPosition([lat, lng]);
    }
  };

  const handleCreateRequest = () => {
    if (startPosition && endPosition) {
      createRideRequestMutation.mutate({
        passengerId: "cmgy7g0f50000sbw1bcy6db25",
        startLat: startPosition[0],
        startLng: startPosition[1],
        endLat: endPosition[0],
        endLng: endPosition[1],
        arrivalTime
      });
      setIsSelectPopupOpen(false);
      setStartPosition(null);
      setEndPosition(null);
    }
  };

  const handleCancel = () => {
    setIsSelectPopupOpen(false);
    setStartPosition(null);
    setEndPosition(null);
  };

  return (
    <div>

        {isSelectPopupOpen && (
          <div 
          style={{
            padding: '15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            marginBottom: '10px',
            borderRadius: '5px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            {startPosition === null 
              ? "📍 Click on the map to select your START position" 
              : endPosition === null 
              ? "📍 Click on the map to select your END position"
              : "✅ Both positions selected! Click 'Create Request' to continue"}
          </div>
        )}
        
        <button 
          onClick={() => setIsSelectPopupOpen(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          Create Request
        </button>

        {isSelectPopupOpen && (
          <div style={{ marginBottom: '10px' }}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
                Arrival Time:
              </label>
              <input 
                type="datetime-local" 
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                style={{
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
            <button 
              onClick={handleCancel}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateRequest}
              disabled={!startPosition || !endPosition}
              style={{
                padding: '8px 16px',
                backgroundColor: startPosition && endPosition ? '#4CAF50' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: startPosition && endPosition ? 'pointer' : 'not-allowed'
              }}
            >
              Create Request
            </button>
          </div>
        )}

          <Map  width="800" height="400" center={userLocation} zoom={12}>
            {({ TileLayer, Marker, Popup, Polyline }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                

                <MapClickHandler 
                  isSelecting={isSelectPopupOpen} 
                  onMapClick={handleMapClick}
                />

                {startPosition && (
                  <Marker position={startPosition}>
                    <Popup>
                      <strong>Start Position</strong><br />
                      Lat: {startPosition[0].toFixed(6)}<br />
                      Lng: {startPosition[1].toFixed(6)}
                    </Popup>
                  </Marker>
                )}

                <ExistingRideRequests comps={{ Marker, Popup, Polyline }}/>

                {endPosition && (
                  <Marker position={endPosition}>
                    <Popup>
                      <strong>End Position</strong><br />
                      Lat: {endPosition[0].toFixed(6)}<br />
                      Lng: {endPosition[1].toFixed(6)}
                    </Popup>
                  </Marker>
                )}

                {startPosition && endPosition && (
                  <Polyline 
                    positions={[startPosition, endPosition]} 
                    color="green" 
                    weight={3}
                    opacity={0.7}
                  />
                )}
              </> 
            )}
          </Map>

    </div>
  )
}