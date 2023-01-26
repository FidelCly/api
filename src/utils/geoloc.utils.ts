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
  lat1: number,
  long1: number,
  lat2: number,
  long2: number
): number {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((long2 - long1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  return d;
}
