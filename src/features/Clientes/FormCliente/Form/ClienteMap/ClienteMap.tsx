import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import './styles.css';
import SearchField from './SearchField';
import DraggableMarker from './DraggableMarker';

interface ClienteMapProps {
  lat?: number;
  lng?: number;
  onLocationChanged?: (
    lat: number,
    lng: number,
    calle?: string,
    altura?: string,
    localidad?: string,
    cp?: string,
    provincia?: string
  ) => void;
}

export default function ClienteMap({
  lat,
  lng,
  onLocationChanged,
}: ClienteMapProps): React.ReactElement {
  return (
    <div style={{ width: '100%', height: '250px' }}>
      <MapContainer
        zoom={17}
        zoomControl={false}
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        center={[
          lat || parseFloat(process.env.REACT_APP_LATITUDE || ''),
          lng || parseFloat(process.env.REACT_APP_LONGITUDE || ''),
        ]}
      >
        {onLocationChanged && <SearchField onLocationChanged={onLocationChanged} />}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {lat && lng && (
          <DraggableMarker
            lat={lat}
            lng={lng}
            onLocationChanged={onLocationChanged}
          />
        )}
      </MapContainer>
    </div>
  );
}
