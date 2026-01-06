
import React, { useState, useEffect } from 'react';
import { Polyline, useMap } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import { GRID_ORIGIN } from '../constants';

interface GridOverlayProps {
  gridSize: number;
}

const GridOverlay: React.FC<GridOverlayProps> = ({ gridSize }) => {
  const map = useMap();
  const [bounds, setBounds] = useState<LatLngBounds>(map.getBounds());

  useEffect(() => {
    const handleMove = () => {
      setBounds(map.getBounds());
    };

    map.on('moveend', handleMove);

    return () => {
      map.off('moveend', handleMove);
    };
  }, [map]);

  const lines = [];
  const north = bounds.getNorth();
  const south = bounds.getSouth();
  const east = bounds.getEast();
  const west = bounds.getWest();

  const startLat = Math.floor((south - GRID_ORIGIN.lat) / gridSize) * gridSize + GRID_ORIGIN.lat;
  const endLat = Math.ceil((north - GRID_ORIGIN.lat) / gridSize) * gridSize + GRID_ORIGIN.lat;

  for (let lat = startLat; lat <= endLat; lat += gridSize) {
    if (lat >= south && lat <= north) {
      lines.push(
        <Polyline
          key={`lat-${lat}`}
          positions={[[lat, west - 0.1], [lat, east + 0.1]]}
          color="#666"
          weight={0.5}
        />
      );
    }
  }

  const startLng = Math.floor((west - GRID_ORIGIN.lng) / gridSize) * gridSize + GRID_ORIGIN.lng;
  const endLng = Math.ceil((east - GRID_ORIGIN.lng) / gridSize) * gridSize + GRID_ORIGIN.lng;

  for (let lng = startLng; lng <= endLng; lng += gridSize) {
    if (lng >= west && lng <= east) {
      lines.push(
        <Polyline
          key={`lng-${lng}`}
          positions={[[south - 0.1, lng], [north + 0.1, lng]]}
          color="#666"
          weight={0.5}
        />
      );
    }
  }

  return <>{lines}</>;
};

export default GridOverlay;
