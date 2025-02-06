import React from 'react';

import { useClienteForm } from './useClienteForm';
import InformacionGeneral from './InformacionGeneral';
import InformacionComercial from './InformacionComercial';
import InformacionImpositiva from './InformacionImpositiva';
import { useTablas } from '../../../../hooks/useTablas';

interface FormProps {
  clienteId: any;
}

export default function Form({ clienteId }: FormProps): React.ReactElement {
  const {
    errors,
    cliente,
    onSubmit,
    isLoading,
    onLocationChanged,
    onClienteFieldChanged,
  } = useClienteForm(clienteId);

  const { tablas } = useTablas(
    'zonas,subzonas,canales,subcanales,condicionesIva,condicionesVenta,listasPrecio,localidades'
  );

  return (
    <form className="mt-0 sm:mt-3.5 pb-3.5 space-y-6" onSubmit={onSubmit}>
      <InformacionGeneral
        errors={errors}
        cliente={cliente}
        zonas={tablas.zonas}
        subzonas={tablas.subzonas}
        localidades={tablas.localidades}
        onLocationChanged={onLocationChanged}
        onChangeClienteField={onClienteFieldChanged}
      />
      <InformacionComercial
        errors={errors}
        cliente={cliente}
        canales={tablas.canales}
        subcanales={tablas.subcanales}
        listasPrecio={tablas.listasPrecio}
        condicionesVenta={tablas.condicionesVenta}
        onChangeClienteField={onClienteFieldChanged}
      />
      <InformacionImpositiva
        errors={errors}
        cliente={cliente}
        condicionesIva={tablas.condicionesIva}
        onChangeClienteField={onClienteFieldChanged}
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {}}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
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
