import React, { useState } from 'react';

import Input from '../../../../components/Input';
import ClienteMap from './ClienteMap/ClienteMap';
import Select from '../../../../components/Select';
import { ICliente } from '../../../../types/Cliente';
import Switch from '../../../../components/Switch';

interface InformacionGeneralProps {
  errors: any;
  zonas: any[];
  subzonas: any[];
  localidades: any[];
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
  zonas,
  errors,
  cliente,
  subzonas,
  localidades,
  onLocationChanged,
  onChangeClienteField,
}: InformacionGeneralProps): React.ReactElement {
  const [currZona, setCurrZona] = useState<number | null>(null);

  const getSubzonasByZona = () => {
    if (currZona) {
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
                error={errors.razon_social}
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
                error={errors.calle}
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
              {/* <Input
                id={'localidad'}
                name={'localidad'}
                type="text"
                label={'Localidad'}
                value={cliente.localidad || ''}
                onChange={onChangeClienteField}
              /> */}
              <Select
                id="localidad"
                label="Localidad"
                options={localidades
                  .sort((a, b) => {
                    if (a.localidad < b.localidad) {
                      return -1;
                    }
                    if (a.localidad > b.localidad) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((localidadOption) => ({
                    label: localidadOption.localidad,
                    value: localidadOption.localidad,
                  }))}
                value={cliente.localidad || -1}
                onOptionChange={(value) =>
                  onChangeClienteField('localidad', value)
                }
                error={errors.localidad}
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
                id="zona_id"
                label="Zona"
                value={currZona || -1}
                options={zonas.map((zona) => ({
                  label: zona.zona_nombre,
                  value: zona.zona_id,
                }))}
                onOptionChange={(value) => {
                  setCurrZona(value as number);
                  onChangeClienteField('zona_sub_id', null);
                }}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Select
                id="zona_sub_id"
                label="Subzona"
                value={cliente.zona_sub_id || -1}
                options={getSubzonasByZona()}
                onOptionChange={(value) =>
                  onChangeClienteField('zona_sub_id', value)
                }
                error={errors.zona_sub_id}
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
              />
            </div>
            <div className="col-span-6">
              <Switch
                id="estado"
                name="estado"
                label="Estado"
                value={cliente.estado}
                onChange={onChangeClienteField}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
