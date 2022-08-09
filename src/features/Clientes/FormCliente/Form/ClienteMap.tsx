import React, { useRef, useMemo, useState, useEffect } from 'react';
import { DivIcon, Marker as IMarker } from 'leaflet';
import * as geocoder from 'esri-leaflet-geocoder';
import { useMap, MapContainer, TileLayer, Marker } from 'react-leaflet';
import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch';

import './styles.css';

interface ClienteMapProps {
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

export default function ClienteMap({
  lat,
  lng,
  onLocationChanged,
}: ClienteMapProps): React.ReactElement {
  const SearchField = () => {
    const map = useMap();

    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: new EsriProvider(),
      showMarker: false,
      marker: {
        icon: new DivIcon({ className: 'clienteMarker' }),
        draggable: true,
      },
      style: 'bar',
      autoClose: true,
      keepResult: true,
      searchLabel: 'Buscar direccion',
    });

    const onLocationFound = (e: any) => {
      const lat = e.location.y;
      const lng = e.location.x;

      (geocoder as any)
        .geocode({
          apikey: process.env.REACT_APP_ARCGIS_API_KEY,
        })
        .text(e.location.label)
        .run((err: any, res: any, response: any) => {
          if (err) {
            onLocationChanged(lat, lng);
            return;
          }

          let results = res.results;
          if (results) {
            const { StName, AddNum, Nbrhd, Postal, Region } =
              results[0].properties;

            return onLocationChanged(
              lat,
              lng,
              StName,
              AddNum,
              Nbrhd,
              Postal,
              Region
            );
          }
        });
    };

    // @ts-ignore
    useEffect(() => {
      map.addControl(searchControl);
      map.on('geosearch/showlocation', onLocationFound);
      return () => map.removeControl(searchControl);
    }, []);

    return null;
  };

  const DraggableMarker = ({ lat, lng }: { lat: number; lng: number }) => {
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
      []
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
  };

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <MapContainer
        zoom={17}
        zoomControl={false}
        style={{ width: '100%', height: '100%' }}
        center={[
          lat || parseFloat(process.env.REACT_APP_LATITUDE || ''),
          lng || parseFloat(process.env.REACT_APP_LONGITUDE || ''),
        ]}
      >
        <SearchField />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {lat && lng && <DraggableMarker lat={lat} lng={lng} />}
      </MapContainer>
    </div>
  );
}
