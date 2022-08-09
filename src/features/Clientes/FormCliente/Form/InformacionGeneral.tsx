import React from 'react';

import { ICliente } from '../../../../types/Cliente';
import ClienteMap from './ClienteMap';

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
              <label
                htmlFor="razon_social"
                className="block text-sm font-medium text-gray-700"
              >
                Razon Social
              </label>
              <input
                type="text"
                name="razon_social"
                id="razon_social"
                value={cliente.razon_social || ''}
                autoComplete="razon_social"
                onChange={(e) =>
                  onChangeClienteField('razon_social', e.target.value)
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-700"
              >
                Telefono
              </label>
              <input
                type="text"
                name="telefono"
                id="telefono"
                value={cliente.telefono || ''}
                autoComplete="telefono"
                onChange={(e) =>
                  onChangeClienteField('telefono', e.target.value)
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
              <label
                htmlFor="calle"
                className="block text-sm font-medium text-gray-700"
              >
                Calle
              </label>
              <input
                type="text"
                name="calle"
                id="calle"
                value={cliente.calle || ''}
                autoComplete="calle"
                onChange={(e) => onChangeClienteField('calle', e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label
                htmlFor="altura"
                className="block text-sm font-medium text-gray-700"
              >
                Altura
              </label>
              <input
                type="text"
                name="altura"
                id="altura"
                value={cliente.altura || ''}
                autoComplete="altura"
                onChange={(e) => onChangeClienteField('altura', e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label
                htmlFor="piso"
                className="block text-sm font-medium text-gray-700"
              >
                Piso
              </label>
              <input
                type="text"
                name="piso"
                id="piso"
                value={cliente.piso || ''}
                autoComplete="piso"
                onChange={(e) => onChangeClienteField('piso', e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label
                htmlFor="depto"
                className="block text-sm font-medium text-gray-700"
              >
                Depto
              </label>
              <input
                type="text"
                name="depto"
                id="depto"
                value={cliente.depto || ''}
                autoComplete="depto"
                onChange={(e) => onChangeClienteField('depto', e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="localidad"
                className="block text-sm font-medium text-gray-700"
              >
                Localidad
              </label>
              <input
                type="text"
                name="localidad"
                id="localidad"
                value={cliente.localidad || ''}
                autoComplete="localidad"
                onChange={(e) =>
                  onChangeClienteField('localidad', e.target.value)
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="codigo_postal"
                className="block text-sm font-medium text-gray-700"
              >
                CP
              </label>
              <input
                type="text"
                name="codigo_postal"
                id="codigo_postal"
                value={cliente.codigo_postal || ''}
                autoComplete="codigo_postal"
                onChange={(e) =>
                  onChangeClienteField('codigo_postal', e.target.value)
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="entre"
                className="block text-sm font-medium text-gray-700"
              >
                Entre
              </label>
              <input
                type="text"
                name="entre"
                id="entre"
                value={cliente.entre || ''}
                autoComplete="entre"
                onChange={(e) => onChangeClienteField('entre', e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="y"
                className="block text-sm font-medium text-gray-700"
              >
                Y
              </label>
              <input
                type="text"
                name="y"
                id="y"
                value={cliente.y || ''}
                autoComplete="y"
                onChange={(e) => onChangeClienteField('y', e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="latitud"
                className="block text-sm font-medium text-gray-700"
              >
                Latitud
              </label>
              <input
                type="text"
                name="latitud"
                id="latitud"
                disabled
                value={cliente.latitud || ''}
                autoComplete="latitud"
                onChange={(e) =>
                  onChangeClienteField('latitud', e.target.value)
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="longitud"
                className="block text-sm font-medium text-gray-700"
              >
                Longitud
              </label>
              <input
                type="text"
                name="longitud"
                id="longitud"
                disabled
                value={cliente.longitud || ''}
                autoComplete="longitud"
                onChange={(e) =>
                  onChangeClienteField('longitud', e.target.value)
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="col-span-6">
              <label
                htmlFor="observaciones"
                className="block text-sm font-medium text-gray-700"
              >
                Observaciones
              </label>
              <input
                type="text"
                name="observaciones"
                id="observaciones"
                value={cliente.observaciones || ''}
                autoComplete="observaciones"
                onChange={(e) =>
                  onChangeClienteField('observaciones', e.target.value)
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
