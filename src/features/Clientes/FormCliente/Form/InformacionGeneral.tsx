import React from 'react';
import Input from '../../../../components/Input';

import ClienteMap from './ClienteMap';
import { ICliente } from '../../../../types/Cliente';

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

const FIELDS = [
  {
    type: 'input',
    id: 'razon_social',
    label: 'Razon Social',
    className: 'col-span-6 sm:col-span-4',
  },
  {
    type: 'input',
    id: 'telefono',
    label: 'Telefono',
    className: 'col-span-6 sm:col-span-2',
  },
  {
    type: 'map',
    id: 'map',
    label: 'Mapa',
    className: 'col-span-6',
  },
  { type: 'input', id: 'calle', label: 'Calle', className: 'col-span-6' },
  {
    type: 'input',
    id: 'altura',
    label: 'Altura',
    className: 'col-span-6 sm:col-span-6 lg:col-span-2',
  },
  {
    type: 'input',
    id: 'piso',
    label: 'Piso',
    className: 'col-span-6 sm:col-span-6 lg:col-span-2',
  },
  {
    type: 'input',
    id: 'depto',
    label: 'Depto',
    className: 'col-span-6 sm:col-span-6 lg:col-span-2',
  },
  {
    type: 'input',
    id: 'localidad',
    label: 'Localidad',
    className: 'col-span-6 sm:col-span-4',
  },
  {
    type: 'input',
    id: 'codigo_postal',
    label: 'CP',
    className: 'col-span-6 sm:col-span-2',
  },
  {
    type: 'input',
    id: 'entre',
    label: 'Entre',
    className: 'col-span-6 sm:col-span-3',
  },
  {
    type: 'input',
    id: 'y',
    label: 'Y',
    className: 'col-span-6 sm:col-span-3',
  },
  {
    type: 'input',
    id: 'latitud',
    label: 'Latitud',
    className: 'col-span-6 sm:col-span-3',
    disabled: true,
  },
  {
    type: 'input',
    id: 'longitud',
    label: 'Longitud',
    className: 'col-span-6 sm:col-span-3',
    disabled: true,
  },
  {
    type: 'input',
    id: 'observaciones',
    label: 'Observaciones',
    className: 'col-span-6',
  },
];

export default function InformacionGeneral({
  cliente,
  onLocationChanged,
  onChangeClienteField,
}: InformacionGeneralProps): React.ReactElement {
  const renderFields = () => {
    return FIELDS.map((field) => (
      <div className={field.className} key={field.id}>
        {field.type === 'map' && (
          <ClienteMap
            lat={cliente.latitud}
            lng={cliente.longitud}
            onLocationChanged={onLocationChanged}
          />
        )}
        {field.type === 'input' && (
          <Input
            id={field.id}
            name={field.id}
            type="text"
            label={field.label}
            value={cliente[field.id as keyof ICliente] || ''}
            onChange={onChangeClienteField}
            disabled={field.disabled}
          />
        )}
      </div>
    ));
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
          <div className="grid grid-cols-6 gap-6">{renderFields()}</div>
        </div>
      </div>
    </div>
  );
}
