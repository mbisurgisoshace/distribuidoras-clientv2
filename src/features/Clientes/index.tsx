import React, { useEffect, useState } from 'react';

import TablaClientes from './TablaClientes';
import OuterWrapper from '../../layouts/OuterWrapper';
import ClientesService from '../../services/ClientesService';

export default function Clientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [isLoadingClientes, setIsLoadingClientes] = useState(true);

  useEffect(() => {
    const getClientes = async () => {
      const clientes = await ClientesService.getClientes();
      setClientes(clientes);
      setIsLoadingClientes(false);
    };

    getClientes();
  }, []);

  return (
    <OuterWrapper>
      <TablaClientes data={clientes} isLoading={isLoadingClientes} />
    </OuterWrapper>
  );
}
