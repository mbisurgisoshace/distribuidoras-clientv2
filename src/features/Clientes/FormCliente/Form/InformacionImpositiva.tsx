import React, { useState, useEffect } from 'react';

import { ICliente } from '../../../../types/Cliente';

import Select from '../../../../components/Select';
import CondicionesIvaService from '../../../../services/CondicionesIvaService';

interface InformacionImpositivaProps {
  cliente: ICliente;
  onChangeClienteField: (field: string, value: any) => void;
}

export default function InformacionImpositiva({
  cliente,
  onChangeClienteField,
}: InformacionImpositivaProps): React.ReactElement {
  const [condicionesIva, setCondicionesIva] = useState<any[]>([]);

  useEffect(() => {
    getCondicionesIva();
  }, []);

  const getCondicionesIva = async () => {
    const condicionesIva = await CondicionesIvaService.getCondicionesIva();
    setCondicionesIva(condicionesIva);
  };

  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Informacion Impositiva
          </h3>
        </div>
        <div className="mt-5 space-y-6 md:mt-0 md:col-span-2">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="cuit"
                className="block text-sm font-medium text-gray-700"
              >
                CUIT
              </label>
              <input
                type="text"
                name="cuit"
                id="cuit"
                value={cliente.cuit || ''}
                autoComplete="cuit"
                onChange={(e) => onChangeClienteField('cuit', e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Select
                label="Condicion de IVA"
                value={cliente.condicion_iva_id || -1}
                options={condicionesIva.map((condicionIva) => ({
                  label: condicionIva.condicion_iva_nombre,
                  value: condicionIva.condicion_iva_id,
                }))}
                onOptionChange={(value) =>
                  onChangeClienteField('condicion_iva_id', value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
