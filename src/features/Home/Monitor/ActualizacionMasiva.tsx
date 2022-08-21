import moment from 'moment';
import { Fragment, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';

import Select from '../../../components/Select';

import { useTablas } from '../../../hooks/useTablas';

interface ActualizacionMasivaProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyActualizacion: (actualizaciones: any) => void;
}

export default function ActualizacionMasiva({
  isOpen,
  onClose,
  onApplyActualizacion,
}: ActualizacionMasivaProps): React.ReactElement {
  const [actualizacion, setActualizacion] = useState<any>({
    tipo_movimiento_id: -1,
    estado_movimiento_id: -1,
    condicion_venta_id: -1,
    motivo_id: -1,
  });

  const { tablas } = useTablas(
    'condicionesVenta,tiposMovimiento,estadosMovimiento,motivos'
  );

  const onActualizar = (e: any) => {
    e.preventDefault();
    onApplyActualizacion(actualizacion);
    onClose();
    setActualizacion({
      tipo_movimiento_id: -1,
      estado_movimiento_id: -1,
      condicion_venta_id: -1,
      motivo_id: -1,
    });
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-indigo-600">
                          Actualizacion Masiva
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <form
                      className="relative mt-6 flex-1 px-4 sm:px-6"
                      onSubmit={onActualizar}
                    >
                      <Select
                        id="estados"
                        label="Estado"
                        onOptionChange={(option) => {
                          setActualizacion({
                            ...actualizacion,
                            estado_movimiento_id: option,
                          });
                        }}
                        options={tablas.estadosMovimiento.map(
                          (estado: any) => ({
                            label: estado.estado_movimiento_nombre,
                            value: estado.estado_movimiento_id,
                          })
                        )}
                        value={actualizacion.estado_movimiento_id}
                      />
                      <Select
                        id="tipos"
                        label="Tipo de Movimiento"
                        onOptionChange={(option) => {
                          setActualizacion({
                            ...actualizacion,
                            tipo_movimiento_id: option,
                          });
                        }}
                        options={tablas.tiposMovimiento.map((tipo: any) => ({
                          label: tipo.tipo_movimiento_nombre,
                          value: tipo.tipo_movimiento_id,
                        }))}
                        value={actualizacion.tipo_movimiento_id}
                      />
                      <Select
                        id="condiciones"
                        label="Condicion de Venta"
                        onOptionChange={(option) => {
                          setActualizacion({
                            ...actualizacion,
                            condicion_venta_id: option,
                          });
                        }}
                        options={tablas.condicionesVenta.map(
                          (condicion: any) => ({
                            label: condicion.condicion_venta_nombre,
                            value: condicion.condicion_venta_id,
                          })
                        )}
                        value={actualizacion.condicion_venta_id}
                      />
                      <Select
                        id="motivos"
                        label="Motivo"
                        onOptionChange={(option) => {
                          setActualizacion({
                            ...actualizacion,
                            motivo_id: option,
                          });
                        }}
                        options={tablas.motivos.map((motivo: any) => ({
                          label: motivo.motivo_nombre,
                          value: motivo.motivo_id,
                        }))}
                        value={actualizacion.motivo_id}
                      />
                      <button
                        type="submit"
                        //disabled={isLoading}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Actualizar
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
