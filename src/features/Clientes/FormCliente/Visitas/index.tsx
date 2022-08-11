import React, { useEffect, useState } from 'react';

import { classNames } from '../../../../layouts/utils';
import PlantillasService from '../../../../services/PlantillasService';
import { useVisitas } from './useVisitas';

interface VisitasProps {
  show: boolean;
  clienteId: any;
}

const diasVisita = [
  { name: 'LUN', value: 'lunes' },
  { name: 'MAR', value: 'martes' },
  { name: 'MIE', value: 'miércoles' },
  { name: 'JUE', value: 'jueves' },
  { name: 'VIE', value: 'viernes' },
  { name: 'SAB', value: 'sábado' },
];

export default function Visitas({
  show,
  clienteId,
}: VisitasProps): React.ReactElement {
  const { dias, onSubmit, isLoading, onSelectDia } = useVisitas(clienteId);

  return (
    <form
      className={`${
        !show ? 'hidden' : 'block'
      } mt-0 sm:mt-3.5 pb-3.5 space-y-6`}
      onSubmit={onSubmit}
    >
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        {/* <div className="px-8 py-12 flex justify-center bg-white"> */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {diasVisita.map((dia) => (
            <div
              key={dia.value}
              onClick={() => onSelectDia(dia.value)}
              className={classNames(
                'cursor-pointer focus:outline-none',
                dias.includes(dia.value)
                  ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                  : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
              )}
            >
              {dia.name}
            </div>
          ))}
        </div>
        {/* </div> */}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
