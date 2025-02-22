import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { Hoja } from '../../../../types/Hoja';
import { Zona } from '../../../../types/Zona';
import { Chofer } from '../../../../types/Chofer';
import { Camion } from '../../../../types/Camion';
import toaster from '../../../../components/Toast/toaster';
import HojasService from '../../../../services/HojasService';
import ZonasService from '../../../../services/ZonasService';
import CamionesService from '../../../../services/CamionesService';
import ChoferesService from '../../../../services/ChoferesService';
import { useHojaValidation } from './useHojaValidation';

export const useHojaForm = (hojaId: any) => {
  const navigate = useNavigate();
  const { validate } = useHojaValidation();
  const [errors, setErrors] = useState({});
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hoja, setHoja] = useState<Partial<Hoja>>();
  const [camiones, setCamiones] = useState<Camion[]>([]);
  const [choferes, setChoferes] = useState<Chofer[]>([]);

  const isHoja = useCallback(
    () => hojaId && !isNaN(parseInt(hojaId)),
    [hojaId]
  );

  useEffect(() => {
    if (isHoja()) {
      //   getHoja(parseInt(hojaId));
      init();
    }
  }, [isHoja, hojaId]);

  const init = async () => {
    await Promise.all([
      getHoja(parseInt(hojaId)),
      getZonas(),
      getCamiones(),
      getChoferes(),
    ]);
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

  const getHoja = async (hojaId: number) => {
    const hoja = await HojasService.getHoja(hojaId);
    setHoja(hoja);
    setIsLoading(false);
  };

  const onHojaFieldChanged = (field: string, value: any) => {
    if (hoja) {
      setHoja((curr) => ({ ...curr, [field]: value }));
    }
  };

  const actualizarHoja = async () => {
    setErrors({});
    const validationErrors = validate(hoja as Hoja);

    if (Object.keys(validationErrors).length > 0) {
      toaster().error({
        title: 'Validacion de datos!',
        infoText: 'Complete todos los campos requeridos.',
      });
      return setErrors(validationErrors);
    }

    setIsLoading(true);

    try {
      await HojasService.updateHojaRuta(parseInt(hojaId), {
        ...(hoja as Hoja),
      });

      toaster().success({
        title: 'Actualizado correctamente!',
        infoText: 'La hoja fue actualizada correctamente.',
      });
    } catch (err: any) {
      console.log('err', err);
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'La hoja no se ha podido guardar.',
      });
    }

    setIsLoading(false);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setErrors({});
    const validationErrors = validate(hoja as Hoja);

    if (Object.keys(validationErrors).length > 0) {
      toaster().error({
        title: 'Validacion de datos!',
        infoText: 'Complete todos los campos requeridos.',
      });
      return setErrors(validationErrors);
    }

    setIsLoading(true);

    try {
      await HojasService.updateHojaRuta(parseInt(hojaId), {
        ...(hoja as Hoja),
        estado: false,
      });

      setHoja({
        ...hoja,
        estado: false,
      });

      toaster().success({
        title: 'Actualizado correctamente!',
        infoText: 'La hoja fue cerrada correctamente.',
      });
    } catch (err: any) {
      console.log('err', err);
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'La hoja no se ha podido cerrar.',
      });
    }

    setIsLoading(false);
  };

  return {
    hoja,
    zonas,
    errors,
    choferes,
    camiones,
    onSubmit,
    isLoading,
    actualizarHoja,
    onHojaFieldChanged,
  };
};
