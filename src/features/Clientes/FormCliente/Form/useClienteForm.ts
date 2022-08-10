import { useState, useEffect, useCallback } from 'react';

import { ICliente } from '../../../../types/Cliente';
import ClientesService from '../../../../services/ClientesService';
import toaster from '../../../../components/Toast/toaster';

const initData: ICliente = {
  razon_social: '',
  telefono: '',
  cuit: '',
  calle: '',
  altura: '',
  piso: '',
  depto: '',
  localidad: '',
  codigo_postal: '',
  entre: '',
  y: '',
  latitud: 0,
  longitud: 0,
  zona_id: null,
  zona_sub_id: null,
  canal_id: null,
  subcanal_id: null,
  condicion_iva_id: null,
  condicion_venta_id: null,
  lista_precio_id: null,
  observaciones: '',
};

export const useClienteForm = (clienteId: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cliente, setCliente] = useState<ICliente>(initData);

  const isCliente = useCallback(
    () => clienteId && !isNaN(parseInt(clienteId)),
    [clienteId]
  );

  useEffect(() => {
    if (isCliente()) {
      getCliente(parseInt(clienteId));
    }
  }, [isCliente, clienteId]);

  const getCliente = async (clienteId: number) => {
    const cliente = await ClientesService.getCliente(clienteId);
    setCliente(cliente);
    setIsLoading(false);
  };

  const onClienteFieldChanged = (field: string, value: any) => {
    setCliente({ ...cliente, [field]: value });
  };

  const onLocationChanged = (
    lat: number,
    lng: number,
    calle?: string,
    altura?: string,
    localidad?: string,
    cp?: string,
    provincia?: string
  ) => {
    if (lat) {
      cliente.latitud = lat;
    }

    if (lng) {
      cliente.longitud = lng;
    }

    if (calle) {
      cliente.calle = calle;
    }

    if (altura) {
      cliente.altura = altura;
    }

    if (localidad) {
      cliente.localidad = localidad;
    }

    if (cp) {
      cliente.codigo_postal = cp;
    }

    setCliente({
      ...cliente,
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isCliente()) {
        await ClientesService.updateCliente(clienteId, cliente);
        toaster().success({
          title: 'Actualizado correctamente!',
          infoText: 'El cliente fue actualizado correctamente.',
        });
      } else {
        console.log('newCliente');
      }
    } catch (err: any) {
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: err,
      });
    }

    setIsLoading(false);
  };

  return {
    cliente,
    onSubmit,
    isLoading,
    onLocationChanged,
    onClienteFieldChanged,
  };
};
