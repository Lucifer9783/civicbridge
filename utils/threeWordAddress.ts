
import { WORD_LIST } from './words';
import { GRID_SIZE_DEGREES, GRID_ORIGIN } from '../constants';
import { LatLng } from '../types';

const WORD_COUNT = WORD_LIST.length;

// A simple pseudo-random number generator for shuffling indices deterministically
const pseudoRandom = (seed: number) => {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

export const coordToThreeWords = (latlng: LatLng): string => {
  const { lat, lng } = latlng;

  // Calculate grid indices from origin
  const gridX = Math.floor((lng - GRID_ORIGIN.lng) / GRID_SIZE_DEGREES);
  const gridY = Math.floor((lat - GRID_ORIGIN.lat) / GRID_SIZE_DEGREES);

  // Combine grid indices into a single unique ID using a pairing function.
  // This ensures that (x, y) maps to a unique number.
  // Using BigInt for larger coordinate spaces to prevent overflow.
  const n1 = BigInt(gridX >= 0 ? 2 * gridX : -2 * gridX - 1);
  const n2 = BigInt(gridY >= 0 ? 2 * gridY : -2 * gridY - 1);
  const uniqueId = Number((n1 + n2) * (n1 + n2 + 1n) / 2n + n2);

  // Use the unique ID as a seed for our PRNG
  const random = pseudoRandom(uniqueId);

  // Generate three word indices.
  // The PRNG ensures that different unique IDs produce different word combinations.
  const index1 = Math.floor(random() * WORD_COUNT);
  const index2 = Math.floor(random() * WORD_COUNT);
  const index3 = Math.floor(random() * WORD_COUNT);

  return `${WORD_LIST[index1]}.${WORD_LIST[index2]}.${WORD_LIST[index3]}`;
};

export const getGridCellCenter = (latlng: LatLng): LatLng => {
    const { lat, lng } = latlng;
    const gridX = Math.floor((lng - GRID_ORIGIN.lng) / GRID_SIZE_DEGREES);
    const gridY = Math.floor((lat - GRID_ORIGIN.lat) / GRID_SIZE_DEGREES);
    
    const centerLng = GRID_ORIGIN.lng + (gridX + 0.5) * GRID_SIZE_DEGREES;
    const centerLat = GRID_ORIGIN.lat + (gridY + 0.5) * GRID_SIZE_DEGREES;

    return { lat: centerLat, lng: centerLng };
};
