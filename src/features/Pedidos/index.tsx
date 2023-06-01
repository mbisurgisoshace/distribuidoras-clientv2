import React, { useEffect, useState } from 'react';
import Autocomplete from '../../components/Autocomplete';
import { useDebounce } from '../../hooks/useDebounce';
import ClientesService from '../../services/ClientesService';
import { ICliente } from '../../types/Cliente';

export default function Pedidos() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const debounceValue = useDebounce<string>(query, 1000);
  const [clientes, setClientes] = useState<ICliente[]>([]);

  useEffect(() => {
    getClientes(debounceValue);
  }, [debounceValue]);

  const getClientes = async (queryText: string) => {
    setLoading(true);
    const clientes = await ClientesService.queryClientes(queryText);
    setLoading(false);
    setClientes(clientes);
  };
  console.log('clientes', clientes);
  return (
    <div>

  <main className="lg:pl-72">
    <div className="xl:pr-96">
      <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">{/* Main area */}</div>
    </div>
  </main>

  <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
    {/* Secondary column (hidden on smaller screens) */}
  </aside>
</div>
  );
}
