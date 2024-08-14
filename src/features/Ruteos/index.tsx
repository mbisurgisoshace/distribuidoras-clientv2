import moment from 'moment';
import { useEffect, useState } from 'react';

import ListadoHojas from './Hojas/ListadoHojas';
import toaster from '../../components/Toast/toaster';
import OuterWrapper from '../../layouts/OuterWrapper';
import HojasService from '../../services/HojasService';

export default function Ruteos() {
  const [hojas, setHojas] = useState<any[]>([]);
  const [isLoadingPedidos, setIsLoadingPedidos] = useState(false);

  useEffect(() => {
    getHojas();
  }, []);

  const getHojas = async () => {
    setIsLoadingPedidos(true);

    try {
      const hojas = await HojasService.searchHojas({
        desde: moment().format('DD-MM-YYYY'),
        hasta: moment().format('DD-MM-YYYY'),
      });
      setHojas(hojas);
    } catch (err) {
      console.log('err', err);
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'No se han podido cargar las hojas.',
      });
    }

    setIsLoadingPedidos(false);
  };

  const onSearch = async (filters: any) => {
    setIsLoadingPedidos(true);
    try {
      const hojas = await HojasService.searchHojas(filters);
      setHojas(hojas);
    } catch (err) {
      console.log('err', err);
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'No se han podido cargar las hojas.',
      });
    }
    setIsLoadingPedidos(false);
  };

  return (
    <OuterWrapper fullWidth>
      <ListadoHojas
        data={hojas}
        onSearch={onSearch}
        isLoading={isLoadingPedidos}
      />
    </OuterWrapper>
  );
}
