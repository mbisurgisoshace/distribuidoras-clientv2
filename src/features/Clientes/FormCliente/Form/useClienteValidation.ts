import { ICliente } from '../../../../types/Cliente';

export const useClienteValidation = () => {
  const validate = (cliente: ICliente) => {
    const validationErrors: any = {};
    if (!cliente.razon_social)
      validationErrors.razon_social = 'Razon social es requerido.';

    if (!cliente.calle) validationErrors.calle = 'Calle es requerido.';

    if (!cliente.localidad)
      validationErrors.localidad = 'Localidad es requerido.';

    if (!cliente.zona_sub_id)
      validationErrors.zona_sub_id = 'Subzona es requerido.';

    if (!cliente.canal_id) validationErrors.canal_id = 'Canal es requerido.';

    if (!cliente.subcanal_id)
      validationErrors.subcanal_id = 'Subcanal es requerido.';

    if (!cliente.condicion_venta_id)
      validationErrors.condicion_venta_id = 'Condicion de venta es requerido.';

    if (!cliente.lista_precio_id)
      validationErrors.lista_precio_id = 'Lista de precio es requerido.';

    if (!cliente.condicion_iva_id)
      validationErrors.condicion_iva_id = 'Condicion de iva es requerido.';

    return validationErrors;
  };

  return {
    validate,
  };
};
