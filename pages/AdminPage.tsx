import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng } from '../types';

type Grievance = {
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  threeWords: string;
  image?: string;
};

const AdminPage: React.FC = () => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminLocation, setAdminLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/grievances')
      .then(res => res.json())
      .then(data => {
        setGrievances(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch grievances', err);
        setLoading(false);
      });
  }, []);

  // 📍 Get admin current location
  const getAdminLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        setAdminLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => alert('Location access denied')
    );
  };

  // 🧭 Navigate to grievance
  const navigateTo = (g: Grievance) => {
    if (!adminLocation) {
      alert('Please set your location first');
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${adminLocation.lat},${adminLocation.lng}&destination=${g.latitude},${g.longitude}&travelmode=driving`;
    window.open(url, '_blank');
  };

  if (loading) {
    return <div className="p-6">Loading grievances...</div>;
  }

  return (
    <div className="p-4 h-screen flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <button
          onClick={getAdminLocation}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Set My Location
        </button>
      </div>

      {adminLocation && (
        <p className="text-sm text-gray-600 mb-2">
          📍 Admin location set
        </p>
      )}

      <div className="flex flex-1 gap-4 overflow-hidden">

        {/* 🗺 MAP PANEL */}
        <div className="w-2/3 h-full rounded-lg overflow-hidden border">
          <MapContainer
            center={[17.6868, 83.2185]}
            zoom={12}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {adminLocation && (
              <Marker position={[adminLocation.lat, adminLocation.lng]}>
                <Popup>You are here</Popup>
              </Marker>
            )}

            {grievances.map((g, i) => (
              <Marker key={i} position={[g.latitude, g.longitude]}>
                <Popup>
                  <strong>{g.threeWords}</strong><br />
                  {g.category}<br />
                  {g.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* 📋 DETAILS PANEL */}
        <div className="w-1/3 h-full overflow-y-auto space-y-3 pr-1">
          {grievances.map((g, i) => (
            <div
              key={i}
              className="bg-white border rounded-lg p-3 shadow-sm"
            >
              <p className="font-semibold text-blue-600">
                {g.threeWords}
              </p>
              <p className="text-sm">
                <b>Category:</b> {g.category}
              </p>
              <p className="text-sm text-gray-700">
                {g.description}
              </p>

              {g.image && (
                <img
                  src={g.image}
                  alt="Issue"
                  className="mt-2 rounded-md max-h-32 w-full object-cover"
                />
              )}

              <button
                onClick={() => navigateTo(g)}
                className="mt-3 w-full bg-blue-600 text-white py-1 rounded-md"
              >
                Navigate
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminPage;
