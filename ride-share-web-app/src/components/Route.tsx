import type { RideOpportunity } from "@prisma/client"

export const Route: React.FC<{routeData: RideOpportunity, others: {Popup: any, Polyline: any, Marker: any}}> = (props) => {
  
  return (
    <>
      <props.others.Popup>
        <a href={"http://localhost:3000/companies/" + props.routeData.id} />
      </props.others.Popup>
      <props.others.Marker position={[props.routeData.startLat, props.routeData.startLng]}>
        <props.others.Popup>
          Start Point for Ride Opportunity {props.routeData.id}
        </props.others.Popup>
      </props.others.Marker>
      <props.others.Marker position={[props.routeData.endLat, props.routeData.endLng]}>
        <props.others.Popup>
          End Point for Ride Opportunity {props.routeData.id}
        </props.others.Popup>
      </props.others.Marker>
                {props.routeData.stops && Array.isArray(props.routeData.stops) && props.routeData.stops.length > 0 && (
                  <props.others.Polyline 
                    positions={props.routeData.stops} 
                    color="blue" 
                    weight={4}
                    opacity={0.7}
                  />
                )}
    </>
  )
}