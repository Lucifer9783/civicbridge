
import { LatLng } from './types';

// Visakhapatnam, Andhra Pradesh, India
export const VISAKHAPATNAM_CENTER: LatLng = { lat: 17.7231, lng: 83.3015 };
export const VISAKHAPATNAM_BOUNDS: [[number, number], [number, number]] = [
  [17.65, 83.2],
  [17.85, 83.4],
];

export const MAP_DEFAULT_ZOOM = 14;
export const MAP_GRID_SHOW_ZOOM = 18;

// ~5 meters at the equator. The actual size varies with latitude.
export const GRID_SIZE_DEGREES = 0.000045; 

// Origin point for the grid system to ensure deterministic addresses.
export const GRID_ORIGIN: LatLng = { lat: 0, lng: 0 };
