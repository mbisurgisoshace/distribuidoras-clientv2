import { Hoja } from '../../../../types/Hoja';

export const useHojaValidation = () => {
  const validate = (hoja: Hoja) => {
    const validationErrors: any = {};
    if (!hoja.chofer_id) validationErrors.chofer_id = 'Chofer es requerido.';

    if (!hoja.zona_id) validationErrors.zona_id = 'Zona es requerido.';

    if (!hoja.camion_id) validationErrors.camion_id = 'Camion es requerido.';

    return validationErrors;
  };

  return {
    validate,
  };
};
