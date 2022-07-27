import React, { useEffect, useState } from 'react';
import { CloudIcon, PlusIcon } from '@heroicons/react/outline';

import TablaClientes from './TablaClientes';
import OuterWrapper from '../../layouts/OuterWrapper';
import ClientesService from '../../services/ClientesService';

export default function Clientes() {
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    const getClientes = async () => {
      const clientes = await ClientesService.getClientes();
      console.log('clientes', clientes);
      setClientes(clientes);
    };

    getClientes();
  }, []);

  return (
    <OuterWrapper>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Clientes
          </h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <CloudIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
              Sincronizar
            </button>
          </span>
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Nuevo Cliente
            </button>
          </span>
        </div>
      </div>
      <TablaClientes data={clientes} />
    </OuterWrapper>
  );
}
