import React, { useEffect, useState } from 'react';

import TablaClientes from './TablaClientes';
import OuterWrapper from '../../layouts/OuterWrapper';
import ClientesService from '../../services/ClientesService';

export default function Clientes() {
  const [clientes, setClientes] = useState<any>([]);
  const [isLoadingClientes, setIsLoadingClientes] = useState(false);

  useEffect(() => {
    getClientes(50, 1);
  }, []);

  const getClientes = async (pageSize: number, currentPage: number) => {
    setIsLoadingClientes(true);
    const clientes = await ClientesService.searchClientes(
      pageSize,
      currentPage
    );
    setClientes(clientes);
    setIsLoadingClientes(false);
  };

  return (
    <OuterWrapper>
      <TablaClientes
        total={clientes.total || 0}
        isLoading={isLoadingClientes}
        data={clientes.clientes || []}
        onPageChange={(currentPage) => getClientes(50, currentPage)}
      />
    </OuterWrapper>
  );
}
