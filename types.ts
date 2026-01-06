
export interface Grievance {
  id: string;
  threeWordAddress: string;
  description: string;
  photo: string; // base64 data URL
  timestamp: number;
  lat: number;
  lng: number;
  category: string;
  status: 'pending' | 'completed';
}

export interface LatLng {
  lat: number;
  lng: number;
}
