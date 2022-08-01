import React, { useEffect } from 'react';
import { DivIcon } from 'leaflet';
import * as geocoder from 'esri-leaflet-geocoder';
import { useMap, MapContainer, TileLayer, Marker } from 'react-leaflet';
import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch';

import './styles.css';
import { MailOpenIcon } from '@heroicons/react/outline';

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
      showMarker: true,
      //   marker: {
      //     icon: new DivIcon({ className: 'clienteMarker' }),
      //     draggable: true,
      //   },
      style: 'bar',
      autoClose: true,
      keepResult: true,
      searchLabel: 'Buscar direccion',
    });

    const onLocationFound = (e: any) => {
      const lat = e.location.y;
      const lng = e.location.x;

      onLocationChanged(lat, lng);

      (geocoder as any)
        .geocode({
          apikey: process.env.REACT_APP_ARCGIS_API_KEY,
        })
        .text(e.location.label)
        .run((err: any, res: any, response: any) => {
          if (err) {
            return;
          }

          let results = res.results;
          if (results) {
            const { StName, AddNum, Nbrhd, Postal, Region } =
              results[0].properties;
            onLocationChanged(lat, lng, StName, AddNum, Nbrhd, Postal, Region);
          }
        });
    };

    const onMarkerMoved = (e: any) => {
      console.log('e', e);
    };

    // @ts-ignore
    useEffect(() => {
      if (lat && lng) {
        map.flyTo({ lat, lng });
      }
      map.addControl(searchControl);
      map.on('geosearch/showlocation', onLocationFound);
      map.on('geosearch/marker/dragend', onMarkerMoved);
      return () => map.removeControl(searchControl);
    }, []);

    return null;
  };

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <MapContainer
        zoom={17}
        zoomControl={false}
        style={{ width: '100%', height: '100%' }}
        center={[
          parseFloat(process.env.REACT_APP_LATITUDE || ''),
          parseFloat(process.env.REACT_APP_LONGITUDE || ''),
        ]}
      >
        <SearchField />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {lat && lng && (
          <Marker
            draggable
            icon={new DivIcon({ className: 'clienteMarker' })}
            position={[lat, lng]}
          />
        )}
      </MapContainer>
    </div>
  );
}
