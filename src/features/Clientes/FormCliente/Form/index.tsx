import React, { useState, useEffect } from 'react';

import InformacionGeneral from './InformacionGeneral';
import InformacionComercial from './InformacionComercial';
import InformacionImpositiva from './InformacionImpositiva';
import ClientesService from '../../../../services/ClientesService';
import { ICliente } from '../../../../types/Cliente';

interface FormProps {
  show: boolean;
  clienteId: any;
}

const initData: ICliente = {
  razon_social: '',
  telefono: '',
  cuit: '',
  calle: '',
  altura: '',
  localidad: '',
  codigo_postal: '',
  entre: '',
  y: '',
  latitud: 0,
  longitud: 0,
  zona_id: null,
  zona_sub_id: null,
  canal_id: null,
  subcanal_id: null,
  condicion_iva_id: null,
  condicion_venta_id: null,
  lista_precio_id: null,
  observaciones: '',
};

export default function Form({
  show,
  clienteId,
}: FormProps): React.ReactElement {
  const [cliente, setCliente] = useState<ICliente>(initData);

  useEffect(() => {
    if (clienteId && !isNaN(parseInt(clienteId))) {
      getCliente(parseInt(clienteId));
    }
  }, [clienteId]);

  const getCliente = async (clienteId: number) => {
    const cliente = await ClientesService.getCliente(clienteId);
    setCliente(cliente);
  };

  return (
    <form
      className={`${!show ? 'hidden' : 'block'} mt-3.5 space-y-6`}
      onSubmit={() => {}}
    >
      <InformacionGeneral
        cliente={cliente}
        onChangeClienteField={(field, value) =>
          setCliente({ ...cliente, [field]: value })
        }
      />
      <InformacionComercial
        cliente={cliente}
        onChangeClienteField={(field, value) =>
          setCliente({ ...cliente, [field]: value })
        }
      />
      <InformacionImpositiva
        cliente={cliente}
        onChangeClienteField={(field, value) =>
          setCliente({ ...cliente, [field]: value })
        }
      />
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}
