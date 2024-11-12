import React, { useState, useEffect, useCallback } from 'react';

import TablaComodatos from './TablaComodatos';
import ClientesService from '../../../../services/ClientesService';

interface PedidosProps {
  clienteId: any;
}

export default function Pedidos({ clienteId }: PedidosProps) {
  const [comodatos, setComodatos] = useState<any>([]);

  const isCliente = useCallback(
    () => clienteId && !isNaN(parseInt(clienteId)),
    [clienteId]
  );

  useEffect(() => {
    if (isCliente()) {
      getComodatosCliente(parseInt(clienteId));
    }
  }, [isCliente, clienteId]);

  const getComodatosCliente = async (clienteId: number) => {
    const comodatos = await ClientesService.getComodatosCliente(clienteId);
    setComodatos(comodatos);
  };

  return (
    <div className="mt-0 sm:mt-3.5 pb-3.5 space-y-6">
      <TablaComodatos data={comodatos} />
    </div>
  );
}
