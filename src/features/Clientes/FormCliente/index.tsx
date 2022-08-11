import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Form from './Form';
import Tabs from '../../../components/Tabs';
import OuterWrapper from '../../../layouts/OuterWrapper';

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
              value: 'pedidos',
              label: 'Pedidos',
              current: view === 'pedidos',
              onClick: (tab) => setView(tab),
            },
            {
              value: 'comodatos',
              label: 'Comodatos',
              current: view === 'comodatos',
              onClick: (tab) => setView(tab),
            },
          ]}
        />
      </>
      <Form show={view === 'general'} clienteId={clienteId} />
    </OuterWrapper>
  );
}
