export const Route: React.FC<{routeData: any, others: {Popup: any, Polyline: any, Marker: any}}> = (props) => {
  const { routeData, others } = props;
  
  // Safely parse stops if it's a JSON value
  let stops = routeData.stops;
  if (typeof stops === 'string') {
    try {
      stops = JSON.parse(stops);
    } catch (e) {
      stops = null;
    }
  }
  
  return (
    <>
      <others.Marker position={[routeData.startLat, routeData.startLng]}>
        <others.Popup>
          <strong>Start Point</strong><br />
          Ride Opportunity ID: {routeData.id}
        </others.Popup>
      </others.Marker>
      <others.Marker position={[routeData.endLat, routeData.endLng]}>
        <others.Popup>
          <strong>End Point</strong><br />
          Ride Opportunity ID: {routeData.id}
          <a href={`/map/ride-opportunities/${routeData.id}`}>View Route</a>
        </others.Popup>
      </others.Marker>
      {stops && Array.isArray(stops) && stops.length > 0 && (
        <others.Polyline 
          positions={stops} 
          color="blue" 
          weight={4}
          opacity={0.7}
        />
      )}
    </>
  )
}