import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Form from './Form';
import Tabs from '../../../components/Tabs';
import { Pedido } from '../../../types/Pedidos';
import OuterWrapper from '../../../layouts/OuterWrapper';
import MovimientosService from '../../../services/MovimientosService';

export default function Hoja() {
  const { hojaId } = useParams();
  const [view, setView] = useState('general');
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    getPedidos();
  }, []);

  const getPedidos = async () => {
    const pedidos = await MovimientosService.getPedidosByHojaId(
      parseInt(hojaId as string)
    );
    setPedidos(pedidos);
  };

  return (
    <OuterWrapper>
      <>
        <Tabs
          tabs={[
            {
              value: 'general',
              label: 'General',
              current: view === 'general',
              onClick: (tab) => setView(tab),
            },
            {
              value: 'pedidos',
              label: 'Pedidos',
              disabled: isNaN(parseInt(hojaId as string)),
              current: view === 'pedidos',
              onClick: (tab) => setView(tab),
            },
            {
              value: 'stock',
              label: 'Stock',
              disabled: isNaN(parseInt(hojaId as string)),
              current: view === 'stock',
              onClick: (tab) => setView(tab),
            },
          ]}
        />
      </>
      {view === 'general' && <Form hojaId={hojaId} pedidos={pedidos} />}
    </OuterWrapper>
  );
}
