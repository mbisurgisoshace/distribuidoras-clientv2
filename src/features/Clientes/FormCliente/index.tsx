import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Form from './Form';
import Tabs from '../../../components/Tabs';
import OuterWrapper from '../../../layouts/OuterWrapper';
import Visitas from './Visitas';
import Pedidos from './Pedidos';
import Comodatos from './Comodatos';

export default function FormCliente(): React.ReactElement {
  const { clienteId } = useParams();
  const [view, setView] = useState('general');

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
              value: 'visitas',
              label: 'Visitas',
              disabled: isNaN(parseInt(clienteId as string)),
              current: view === 'visitas',
              onClick: (tab) => setView(tab),
            },
            {
              value: 'pedidos',
              label: 'Pedidos',
              disabled: isNaN(parseInt(clienteId as string)),
              current: view === 'pedidos',
              onClick: (tab) => setView(tab),
            },
            {
              value: 'comodatos',
              label: 'Comodatos',
              disabled: isNaN(parseInt(clienteId as string)),
              current: view === 'comodatos',
              onClick: (tab) => setView(tab),
            },
          ]}
        />
      </>
      {view === 'general' && <Form clienteId={clienteId} />}
      {view === 'visitas' && <Visitas clienteId={clienteId} />}
      {view === 'pedidos' && <Pedidos clienteId={clienteId} />}
      {view === 'comodatos' && <Comodatos clienteId={clienteId} />}
    </OuterWrapper>
  );
}
