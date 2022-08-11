import React from 'react';

import { useClienteForm } from './useClienteForm';
import InformacionGeneral from './InformacionGeneral';
import InformacionComercial from './InformacionComercial';
import InformacionImpositiva from './InformacionImpositiva';

interface FormProps {
  show: boolean;
  clienteId: any;
}

export default function Form({
  show,
  clienteId,
}: FormProps): React.ReactElement {
  const {
    errors,
    cliente,
    onSubmit,
    isLoading,
    onLocationChanged,
    onClienteFieldChanged,
  } = useClienteForm(clienteId);
  console.log('errors', errors);
  return (
    <form
      className={`${
        !show ? 'hidden' : 'block'
      } mt-0 sm:mt-3.5 pb-3.5 space-y-6`}
      onSubmit={onSubmit}
    >
      <InformacionGeneral
        errors={errors}
        cliente={cliente}
        onLocationChanged={onLocationChanged}
        onChangeClienteField={onClienteFieldChanged}
      />
      <InformacionComercial
        errors={errors}
        cliente={cliente}
        onChangeClienteField={onClienteFieldChanged}
      />
      <InformacionImpositiva
        errors={errors}
        cliente={cliente}
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
