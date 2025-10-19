import type { RideOpportunity } from '@prisma/client';
import { useState, useEffect } from 'react';

import Map from '~/components/Map';
import { Route } from '~/components/Route';
import type { Coordinate } from '~/types/main';

const DEFAULT_CENTER: [number, number] = [38.907132, -77.036546]

import { api } from "~/utils/api";
// Simulate a route with multiple waypoints
const ROUTE_COORDINATES: [number, number][] = [
  [38.907132, -77.036546],  
  [38.910, -77.040],
  [38.915, -77.045],
  [38.920, -77.048],
  [38.925, -77.050] 
]



export default function RideOpportunities() {
  const [userLocation, setUserLocation] = useState<Coordinate>(DEFAULT_CENTER);
  const rides  = api.post.getRidesOpportunities.useQuery(); 
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

  

  return (
    <div>
          <Map  width="800" height="400" center={userLocation} zoom={12}>
            {({ TileLayer, Marker, Popup, Polyline }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {rides?.data?.map((ride) => (
                  <Route routeData={ride} others={{ TileLayer, Marker, Popup, Polyline }} />
                ))}

              </> 
            )}
          </Map>

    </div>
  )
}