import React, { useEffect, useState } from 'react';

import TablaClientes from './TablaClientes';
import OuterWrapper from '../../layouts/OuterWrapper';
import ClientesService from '../../services/ClientesService';

export default function Clientes() {
  const [filterText, setFilterText] = useState('');
  const [clientes, setClientes] = useState<any>([]);
  const [isLoadingClientes, setIsLoadingClientes] = useState(false);

  useEffect(() => {
    getClientes('', 50, 1);
  }, []);

  const getClientes = async (
    filterText: string,
    pageSize: number,
    currentPage: number
  ) => {
    console.log('currentPage', currentPage);
    setIsLoadingClientes(true);
    const clientes = await ClientesService.searchClientes(
      filterText,
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
        onFilterApply={(filterValue) => {
          setFilterText(filterValue);
          getClientes(filterValue, 50, 1);
        }}
        onPageChange={(currentPage) => getClientes(filterText, 50, currentPage)}
      />
    </OuterWrapper>
  );
}
