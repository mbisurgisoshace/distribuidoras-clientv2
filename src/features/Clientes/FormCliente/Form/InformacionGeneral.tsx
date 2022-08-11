import React, { useState, useEffect } from 'react';

import Input from '../../../../components/Input';
import ClienteMap from './ClienteMap/ClienteMap';
import Select from '../../../../components/Select';
import { ICliente } from '../../../../types/Cliente';
import ZonasService from '../../../../services/ZonasService';

interface InformacionGeneralProps {
  cliente: ICliente;
  onLocationChanged: (
    lat: number,
    lng: number,
    calle?: string,
    altura?: string,
    localidad?: string,
    cp?: string,
    provincia?: string
  ) => void;
  onChangeClienteField: (field: string, value: any) => void;
}

export default function InformacionGeneral({
  cliente,
  onLocationChanged,
  onChangeClienteField,
}: InformacionGeneralProps): React.ReactElement {
  const [zonas, setZonas] = useState<any[]>([]);
  const [subzonas, setSubzonas] = useState<any[]>([]);
  const [currZona, setCurrZona] = useState<number | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const zonas = await ZonasService.getZonas();
    const subzonas = await ZonasService.getSubzonas();

    setZonas(zonas);
    setSubzonas(subzonas);
  };

  const getSubzonasByZona = () => {
    if (currZona && !cliente.zona_sub_id) {
      return subzonas
        .filter((subzona) => subzona.zona_id === currZona)
        .map((subzona) => ({
          label: subzona.sub_zona_nombre,
          value: subzona.sub_zona_id,
        }));
    }

    if (!currZona && cliente.zona_sub_id) {
      return subzonas.map((subzona) => ({
        label: subzona.sub_zona_nombre,
        value: subzona.sub_zona_id,
      }));
    }

    return [];
  };

  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Informacion General
          </h3>
        </div>
        <div className="mt-5 space-y-6 md:mt-0 md:col-span-2">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-4">
              <Input
                id={'razon_social'}
                name={'razon_social'}
                type="text"
                label={'Razon Social'}
                value={cliente.razon_social || ''}
                onChange={onChangeClienteField}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <Input
                id={'telefono'}
                name={'telefono'}
                type="text"
                label={'Telefono'}
                value={cliente.telefono || ''}
                onChange={onChangeClienteField}
              />
            </div>
            <div className="col-span-6">
              <ClienteMap
                lat={cliente.latitud}
                lng={cliente.longitud}
                onLocationChanged={onLocationChanged}
              />
            </div>
            <div className="col-span-6">
              <Input
                id={'calle'}
                name={'calle'}
                type="text"
                label={'Calle'}
                value={cliente.calle || ''}
                onChange={onChangeClienteField}
              />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <Input
                id={'altura'}
                name={'altura'}
                type="text"
                label={'Altura'}
                value={cliente.altura || ''}
                onChange={onChangeClienteField}
              />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <Input
                id={'piso'}
                name={'piso'}
                type="text"
                label={'Piso'}
                value={cliente.piso || ''}
                onChange={onChangeClienteField}
              />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <Input
                id={'depto'}
                name={'depto'}
                type="text"
                label={'Depto'}
                value={cliente.depto || ''}
                onChange={onChangeClienteField}
              />
            </div>
            <div className="col-span-6 sm:col-span-4">
              <Input
                id={'localidad'}
                name={'localidad'}
                type="text"
                label={'Localidad'}
                value={cliente.localidad || ''}
                onChange={onChangeClienteField}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <Input
                id={'codigo_postal'}
                name={'codigo_postal'}
                type="text"
                label={'CP'}
                value={cliente.codigo_postal || ''}
                onChange={onChangeClienteField}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Input
                id={'entre'}
                name={'entre'}
                type="text"
                label={'Entre'}
                value={cliente.entre || ''}
                onChange={onChangeClienteField}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Input
                id={'y'}
                name={'y'}
                type="text"
                label={'Y'}
                value={cliente.y || ''}
                onChange={onChangeClienteField}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Select
                label="Zona"
                value={currZona || -1}
                options={zonas.map((zona) => ({
                  label: zona.zona_nombre,
                  value: zona.zona_id,
                }))}
                onOptionChange={(value) => {
                  setCurrZona(value);
                  onChangeClienteField('zona_sub_id', null);
                }}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Select
                label="Subzona"
                value={cliente.zona_sub_id || -1}
                options={getSubzonasByZona()}
                onOptionChange={(value) =>
                  onChangeClienteField('zona_sub_id', value)
                }
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Input
                id={'latitud'}
                name={'latitud'}
                type="text"
                label={'Latitud'}
                value={cliente.latitud || ''}
                onChange={onChangeClienteField}
                disabled
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Input
                id={'longitud'}
                name={'longitud'}
                type="text"
                label={'Longitud'}
                value={cliente.longitud || ''}
                onChange={onChangeClienteField}
                disabled
              />
            </div>
            <div className="col-span-6">
              <Input
                id={'observaciones'}
                name={'observaciones'}
                type="text"
                label={'Observaciones'}
                value={cliente.observaciones || ''}
                onChange={onChangeClienteField}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
