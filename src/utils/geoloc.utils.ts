/**
 * Get distance between two geolocation points.
 * 
 * @param lat1 - The latitude of the first geoloc
 * @param long1 - The longitude of the first geoloc
 * @param lat2 - The latitude of the second geoloc
 * @param long2 - The longitude of the second geoloc
 * 
 * @returns The distance in metres (float)
 */
export function getDistance(
  lat1: string,
  long1: string,
  lat2: string,
  long2: string
): number {
  const lat1n = Number(lat1);
  const long1n = Number(long1);
  const lat2n = Number(lat2);
  const long2n = Number(long2);

  const R = 6371e3; // metres
  const φ1 = (lat1n * Math.PI) / 180;
  const φ2 = (lat2n * Math.PI) / 180;
  const Δφ = ((lat2n - lat1n) * Math.PI) / 180;
  const Δλ = ((long2n - long1n) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  return d;
}
