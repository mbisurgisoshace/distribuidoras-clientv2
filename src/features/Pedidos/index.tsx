import { useEffect, useState } from 'react';
import Autocomplete from '../../components/Autocomplete';
import { useDebounce } from '../../hooks/useDebounce';
import ClientesService from '../../services/ClientesService';
import { ICliente } from '../../types/Cliente';

export default function Pedidos() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
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
      Pedidos
      <Autocomplete
        loading={loading}
        options={clientes.map((cliente) => ({
          value: cliente.cliente_id as number,
          label: cliente.razon_social,
        }))}
        value=""
        onQueryChange={(query) => setQuery(query)}
        onOptionChange={() => {}}
      />
    </div>
  );
}
