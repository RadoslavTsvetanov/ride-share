import polyline  from '@mapbox/polyline';

export interface Route {
  coordinates: [number, number][];
  distance: number;
  duration: number;
}

export async function getRoute(
  start: [number, number],
  end: [number, number]
): Promise<Route | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTESERVICE_API_KEY;
    if (!apiKey) {
      console.error('OpenRouteService API key is not set');
      return null;
    }

    // Ensure coordinates are in [lng, lat] order for OpenRouteService
    const startLngLat = [start[1], start[0]]; // Convert [lat, lng] to [lng, lat]
    const endLngLat = [end[1], end[0]]; // Convert [lat, lng] to [lng, lat]
    
    // First try with default radius (350m)
    let response = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startLngLat[0]},${startLngLat[1]}&end=${endLngLat[0]},${endLngLat[1]}`
    );

    // If 400 with radius error, try with increased radius (2000m)
    if (response.status === 400) {
      const error = await response.json();
      if (error.error?.message?.includes('routable point within a radius')) {
        response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startLngLat[0]},${startLngLat[1]}&end=${endLngLat[0]},${endLngLat[1]}&options={"maximum_speed":90,"maximum_speed_urban":50,"profile_params":{"weightings":{"steepness_difficulty":1,"green":0.1,"quiet":0.1}},"allow_unsuitable":true,"profile":"driving-car"}`
        );
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch route: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    console.log("coords", data.features[0].geometry)
    return {
      coordinates: data.features[0].geometry,
      distance: data.features[0].properties.segments[0].distance,
      duration: data.features[0].properties.segments[0].duration,
    };
  } catch (error) {
    console.error('Error fetching route:', error);
    return null;
  }
}