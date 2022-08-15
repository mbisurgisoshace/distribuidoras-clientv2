import { useEffect } from 'react';
import { DivIcon } from 'leaflet';
import { useMap } from 'react-leaflet';
import * as geocoder from 'esri-leaflet-geocoder';
import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch';

interface SearchFieldProps {
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

export default function SearchField({ onLocationChanged }: SearchFieldProps) {
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
    return () => {
      map.removeControl(searchControl);
      map.removeEventListener('geosearch/showlocation');
    };
  }, [onLocationFound]);

  return null;
}
