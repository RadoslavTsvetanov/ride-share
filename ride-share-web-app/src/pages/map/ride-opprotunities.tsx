import Head from 'next/head';


import Map from '~/components/Map';

const DEFAULT_CENTER = [38.907132, -77.036546]

// Simulate a route with multiple waypoints
const ROUTE_COORDINATES = [
  [38.907132, -77.036546],  // Start point
  [38.910, -77.040],
  [38.915, -77.045],
  [38.920, -77.048],
  [38.925, -77.050]  // End point
]

export default function Home() {
  return (
    <div>
          <Map  width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
            {({ TileLayer, Marker, Popup, Polyline }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={ROUTE_COORDINATES[0]}>
                  <Popup>
                    Start Point
                  </Popup>
                </Marker>
                <Marker position={ROUTE_COORDINATES[ROUTE_COORDINATES.length - 1]}>
                  <Popup>
                    End Point
                  </Popup>
                </Marker>
                <Polyline 
                  positions={ROUTE_COORDINATES} 
                  color="blue" 
                  weight={4}
                  opacity={0.7}
                />
              </>
            )}
          </Map>

    </div>
  )
}