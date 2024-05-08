import { useEffect, useState } from 'react';

import { Hoja } from '../../../types/Hoja';
import HojasService from '../../../services/HojasService';

export const useHojas = () => {
  const [hojas, setHojas] = useState<Hoja[]>([]);

  useEffect(() => {
    const getHojas = async () => {
      const fetchedHojas = await HojasService.getHojasByEstado(1);
      setHojas(fetchedHojas);
    };

    getHojas();
  }, []);

  return { hojas };
};
