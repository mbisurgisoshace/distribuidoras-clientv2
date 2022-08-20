import { useState, useEffect } from 'react';
import TablasService from '../services/TablasService';

export const useTablas = (tablasQuery: string) => {
  const [tablas, setTablas] = useState({
    zonas: [],
    subzonas: [],
    canales: [],
    subcanales: [],
    condicionesIva: [],
    condicionesVenta: [],
    listasPrecio: [],
    tiposMovimiento: [],
    estadosMovimiento: [],
    motivos: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTablas = async () => {
      const fetchedTablas = await TablasService.getTablas(tablasQuery);
      setTablas((t) => ({
        ...t,
        ...fetchedTablas,
      }));
    };

    getTablas();
  }, [tablasQuery]);

  return {
    tablas,
  };
};
