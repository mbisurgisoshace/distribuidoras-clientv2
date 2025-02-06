import React, { useState } from 'react';
import { IClienteView } from '../../../types/Cliente';
import ActualizarCliente from './ActualizarCliente';

interface DetalleClienteProps {
  cliente?: IClienteView;
  onActualizarCliente: (cliente: IClienteView) => void;
}
export default function DetalleCliente({
  cliente,
  onActualizarCliente,
}: DetalleClienteProps): React.ReactElement {
  const [isUpdateClienteOpen, setIsUpdateClienteOpen] = useState(false);
  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <h5 className="text-lg font-medium leading-7 text-gray-900 sm:truncate">
        Detalles del Cliente
      </h5>
      <div className="flex items-center mt-4">
        <div className="h-11 w-11 flex items-center justify-center rounded-full bg-indigo-200">
          <span className="font-medium text-sm text-indigo-500">
            {cliente ? cliente.canal_nombre?.substring(0, 3).toUpperCase() : ''}
          </span>
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">
            {cliente ? cliente.razon_social : 'Razon Social'}
          </div>
          <div className="text-gray-500 text-sm">
            {cliente ? cliente.telefono : 'Telefono'}
          </div>
        </div>
      </div>
      <div className="relative mt-4 mb-4">
        <div className="flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
      </div>
      <div>
        <div className="font-medium text-gray-900">
          {cliente ? `${cliente.calle} ${cliente.altura}` : 'Direccion'}
        </div>
        <div className="text-gray-500 text-sm">
          {cliente ? cliente.sub_zona_nombre : 'Zona'}
        </div>
      </div>

      <button
        disabled={!cliente}
        onClick={() => setIsUpdateClienteOpen(true)}
        className="rounded mt-4 w-full bg-indigo-100 px-2 py-1 text-sm font-normal text-indigo-500 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Editar
      </button>

      {cliente && (
        <ActualizarCliente
          cliente={cliente}
          isOpen={isUpdateClienteOpen}
          onApplyActualizacion={onActualizarCliente}
          onClose={() => setIsUpdateClienteOpen(false)}
        />
      )}
    </div>
  );
}
