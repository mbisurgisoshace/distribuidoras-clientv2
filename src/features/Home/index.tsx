import moment from 'moment';
import { useState, useEffect } from 'react';

import toaster from '../../components/Toast/toaster';
import OuterWrapper from '../../layouts/OuterWrapper';
import MonitorPedidos from './Monitor/MonitorPedidos';
import MovimientosService from '../../services/MovimientosService';

export default function Home() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [isLoadingPedidos, setIsLoadingPedidos] = useState(false);

  useEffect(() => {
    getPedidos();
  }, []);

  const getPedidos = async () => {
    setIsLoadingPedidos(true);
    try {
      const pedidos = await MovimientosService.searchMovimientos({
        desde: moment().format('DD-MM-YYYY'),
        hasta: moment().format('DD-MM-YYYY'),
      });
      setPedidos(pedidos);
    } catch (err) {
      console.log('err', err);
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'No se han podido cargar los pedidos.',
      });
    }
    setIsLoadingPedidos(false);
  };

  const onSearch = async (filters: any) => {
    setIsLoadingPedidos(true);
    try {
      const pedidos: any[] = await MovimientosService.searchMovimientos(
        filters
      );
      setPedidos(pedidos);
    } catch (err) {
      console.log('err', err);
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'No se han podido cargar los pedidos.',
      });
    }
    setIsLoadingPedidos(false);
  };

  return (
    <OuterWrapper fullWidth>
      <MonitorPedidos
        data={pedidos}
        onSearch={onSearch}
        isLoading={isLoadingPedidos}
      />
    </OuterWrapper>
  );
}
