
import React, { useEffect, useState, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import GridOverlay from './GridOverlay';
import { VISAKHAPATNAM_CENTER, MAP_DEFAULT_ZOOM, MAP_GRID_SHOW_ZOOM, GRID_SIZE_DEGREES } from '../constants';
import { coordToThreeWords, getGridCellCenter } from '../utils/threeWordAddress';
import { LatLng } from '../types';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const startNavigationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const userLocationIcon = new L.DivIcon({
  className: 'user-marker-icon',
  html: '<div class="pulse"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface MapControllerProps {
  center: LatLng;
  zoom: number;
}

const MapController: React.FC<MapControllerProps> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center.lat !== 0 && center.lng !== 0) {
      map.setView([center.lat, center.lng], zoom);
    }
  }, [center, zoom, map]);
  return null;
};

interface InteractiveMapProps {
  center: LatLng;
  zoom?: number;
  selectedLocation?: LatLng | null;
  onMapClick: (latlng: LatLng) => void;
  highlightedGrievance?: LatLng | null;
  userLocation?: LatLng | null;
  isNavigationMode?: boolean;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  center, 
  zoom = MAP_DEFAULT_ZOOM, 
  selectedLocation, 
  onMapClick,
  highlightedGrievance,
  userLocation,
  isNavigationMode = false,
}) => {
  const [currentZoom, setCurrentZoom] = useState(zoom);

  const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
        onMapClick(e.latlng);
      },
      zoomend() {
        setCurrentZoom(map.getZoom());
      },
    });
    return null;
  };

  const threeWordAddress = selectedLocation ? coordToThreeWords(selectedLocation) : '';
  const cellCenter = selectedLocation ? getGridCellCenter(selectedLocation) : null;

  return (
    <div className={`h-full w-full bg-gray-300 ${isNavigationMode ? 'cursor-crosshair' : ''}`}>
      <MapContainer
        center={[VISAKHAPATNAM_CENTER.lat, VISAKHAPATNAM_CENTER.lng]}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full"
        maxZoom={21}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={19}
        />
        <MapController center={center} zoom={zoom} />
        <MapEvents />
        {currentZoom >= MAP_GRID_SHOW_ZOOM && <GridOverlay gridSize={GRID_SIZE_DEGREES} />}

        {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
                <Popup>You are here</Popup>
            </Marker>
        )}

        {cellCenter && !isNavigationMode && (
          <Marker position={[cellCenter.lat, cellCenter.lng]} icon={customIcon}>
            <Popup>
              <div className="font-bold text-lg text-blue-600">{threeWordAddress}</div>
              <div className="text-gray-600 text-sm">
                Lat: {cellCenter.lat.toFixed(6)}, Lng: {cellCenter.lng.toFixed(6)}
              </div>
            </Popup>
          </Marker>
        )}
        {cellCenter && isNavigationMode && (
             <Marker position={[cellCenter.lat, cellCenter.lng]} icon={startNavigationIcon}>
                <Popup>
                    <div className="font-bold text-lg text-green-600">Navigation Start Point</div>
                </Popup>
             </Marker>
        )}
         {highlightedGrievance && (
            <Marker position={[highlightedGrievance.lat, highlightedGrievance.lng]} icon={customIcon}>
               <Popup>
                    <div className="font-bold text-lg text-red-600">Destination</div>
                    <div className="text-gray-600 text-sm">
                        {coordToThreeWords(highlightedGrievance)}
                    </div>
               </Popup>
            </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default memo(InteractiveMap);
