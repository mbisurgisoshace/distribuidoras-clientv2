import React, { useEffect, useState } from 'react';

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
      <TablaClientes data={clientes} />
    </OuterWrapper>
  );
}
