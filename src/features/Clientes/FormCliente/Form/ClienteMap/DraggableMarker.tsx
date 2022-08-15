import React, { useRef, useMemo } from 'react';
import { useMap, Marker } from 'react-leaflet';
import { DivIcon, Marker as IMarker } from 'leaflet';

interface DraggableMarkerProps {
  lat: number;
  lng: number;
  onLocationChanged: (
    lat: number,
    lng: number,
    calle?: string,
    altura?: string,
    localidad?: string,
    cp?: string,
    provincia?: string
  ) => void;
}

export default function DraggableMarker({
  lat,
  lng,
  onLocationChanged,
}: DraggableMarkerProps) {
  const map = useMap();
  const markerRef = useRef<IMarker>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          const { lat, lng } = marker.getLatLng();
          onLocationChanged(lat, lng);
        }
      },
    }),
    [onLocationChanged]
  );

  map.flyTo([lat, lng], 17, { animate: false });

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={{ lat, lng }}
      ref={markerRef}
      icon={new DivIcon({ className: 'clienteMarker' })}
    />
  );
}
