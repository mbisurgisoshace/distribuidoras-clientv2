import React, { useState, useEffect, useCallback } from 'react';

import TablaPedidos from './TablaPedidos';
import ClientesService from '../../../../services/ClientesService';

interface PedidosProps {
  clienteId: any;
}

export default function Pedidos({ clienteId }: PedidosProps) {
  const [pedidos, setPedidos] = useState<any>([]);

  const isCliente = useCallback(
    () => clienteId && !isNaN(parseInt(clienteId)),
    [clienteId]
  );

  useEffect(() => {
    if (isCliente()) {
      getUltimosPedidos(parseInt(clienteId));
    }
  }, [isCliente, clienteId]);

  const getUltimosPedidos = async (clienteId: number) => {
    const pedidos = await ClientesService.getLastPedidos(clienteId);
    setPedidos(pedidos);
  };

  return (
    <div className="mt-0 sm:mt-3.5 pb-3.5 space-y-6">
      <TablaPedidos data={pedidos} />
    </div>
  );
}
