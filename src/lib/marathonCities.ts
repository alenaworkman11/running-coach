export const marathonCityKeys = ["boston", "london", "berlin", "chicago", "newYork"] as const;

export type MarathonCityKey = (typeof marathonCityKeys)[number];

export interface MarathonCity {
  key: MarathonCityKey;
  lat: number;
  lng: number;
}

export const marathonCities: MarathonCity[] = [
  { key: "boston", lat: 42.3601, lng: -71.0589 },
  { key: "london", lat: 51.5074, lng: -0.1278 },
  { key: "berlin", lat: 52.52, lng: 13.405 },
  { key: "chicago", lat: 41.8781, lng: -87.6298 },
  { key: "newYork", lat: 40.7128, lng: -74.006 },
];

export const defaultMapCenter: [number, number] = [48, -15];
export const defaultMapZoom = 3;
export const cityMapZoom = 12;
