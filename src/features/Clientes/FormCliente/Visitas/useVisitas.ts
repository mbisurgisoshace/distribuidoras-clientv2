import { useState, useEffect, useCallback } from 'react';

import toaster from '../../../../components/Toast/toaster';
import PlantillasService from '../../../../services/PlantillasService';

export const useVisitas = (clienteId: any) => {
  const [dias, setDias] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isCliente = useCallback(
    () => clienteId && !isNaN(parseInt(clienteId)),
    [clienteId]
  );

  useEffect(() => {
    if (isCliente()) {
      getPlantillas(parseInt(clienteId));
    }
  }, [isCliente, clienteId]);

  const getPlantillas = async (clienteId: number) => {
    const plantillas = await PlantillasService.getPlantillasCliente(clienteId);
    setDias([...plantillas.map((plantilla) => plantilla.dia_semana)]);
  };

  const onSelectDia = (diaSeleccionado: string) => {
    const diaIndex = dias.findIndex((dia) => dia === diaSeleccionado);

    if (diaIndex !== -1) {
      dias.splice(diaIndex, 1);
    } else {
      dias.push(diaSeleccionado);
    }

    setDias([...dias]);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await PlantillasService.updatePlantillasCliente(clienteId, dias);
      toaster().success({
        title: 'Actualizado correctamente!',
        infoText: 'Los dias fueron guardados correctamente.',
      });
    } catch (err) {
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'Los dias no se han podido guardar.',
      });
    }

    setIsLoading(false);
  };

  return {
    dias,
    onSubmit,
    isLoading,
    onSelectDia,
  };
};
