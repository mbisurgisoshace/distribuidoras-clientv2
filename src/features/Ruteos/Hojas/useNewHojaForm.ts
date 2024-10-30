import moment from 'moment';
import { useEffect, useState } from 'react';

import { Zona } from '../../../types/Zona';
import { NewHoja } from '../../../types/Hoja';
import { Camion } from '../../../types/Camion';
import { Chofer } from '../../../types/Chofer';
import ZonasService from '../../../services/ZonasService';
import CamionesService from '../../../services/CamionesService';
import ChoferesService from '../../../services/ChoferesService';
import toaster from '../../../components/Toast/toaster';
import HojasService from '../../../services/HojasService';

const initData: NewHoja = {
  km_inicial: 0,
  zona_id: null,
  camion_id: null,
  chofer_id: null,
  acompanante_id: null,
  hoja_ruta_numero: '',
  fecha: moment().format('DD-MM-YYYY'),
};

export const useNewHojaForm = () => {
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoja, setHoja] = useState<NewHoja>(initData);
  const [camiones, setCamiones] = useState<Camion[]>([]);
  const [choferes, setChoferes] = useState<Chofer[]>([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await Promise.all([getZonas(), getCamiones(), getChoferes()]);
    setIsLoading(false);
  };

  const getZonas = async () => {
    const zonas = await ZonasService.getZonas();
    setZonas(zonas);
  };

  const getCamiones = async () => {
    const camiones = await CamionesService.getCamiones();
    setCamiones(camiones);
  };

  const getChoferes = async () => {
    const choferes = await ChoferesService.getChoferes();
    setChoferes(choferes);
  };

  const abrirHojaRuta = async (hoja: NewHoja, clientes: any[]) => {
    setIsLoading(true);

    try {
      await HojasService.abrirHojaRuta(hoja, clientes);
    } catch (err) {
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'La hoja no se ha podido abrir.',
      });
    }

    setIsLoading(false);
  };

  return {
    hoja,
    zonas,
    setHoja,
    camiones,
    choferes,
    isLoading,
    abrirHojaRuta,
  };
};
