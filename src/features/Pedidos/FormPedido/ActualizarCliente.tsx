import moment from 'moment';
import { Fragment, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';

import Select from '../../../components/Select';

import { useTablas } from '../../../hooks/useTablas';
import Input from '../../../components/Input';
import { IClienteView } from '../../../types/Cliente';

interface ActualizarClienteProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: IClienteView;
  onApplyActualizacion: (actualizaciones: any) => void;
}

export default function ActualizarCliente({
  isOpen,
  onClose,
  cliente,
  onApplyActualizacion,
}: ActualizarClienteProps): React.ReactElement {
  const [clienteEditable, setClienteEditable] = useState<Partial<IClienteView>>(
    {
      y: cliente?.y,
      calle: cliente?.calle,
      entre: cliente?.entre,
      altura: cliente?.altura,
      telefono: cliente?.telefono,
      razon_social: cliente?.razon_social,
    }
  );

  //   const { tablas } = useTablas(
  //     'condicionesVenta,tiposMovimiento,estadosMovimiento,motivos'
  //   );

  const onActualizar = (e: any) => {
    e.preventDefault();
    onApplyActualizacion(clienteEditable);
    onClose();
  };

  const onChangeField = (name: string, value: any) => {
    setClienteEditable({
      ...clienteEditable,
      [name]: value,
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
                          Actualizar Cliente
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
                      <Input
                        type="text"
                        id="razon_social"
                        name="razon_social"
                        label="Razon Social"
                        onChange={onChangeField}
                        value={clienteEditable.razon_social || ''}
                      />

                      <div className="flex items-center justify-between">
                        <div>
                          <Input
                            id="cuit"
                            label="CUIT"
                            name="cuit"
                            type="text"
                            onChange={onChangeField}
                            value={clienteEditable.cuit || ''}
                          />
                        </div>

                        <div>
                          <Input
                            id="telefono"
                            label="Telefono"
                            name="telefono"
                            type="text"
                            onChange={onChangeField}
                            value={clienteEditable.telefono || ''}
                          />
                        </div>
                      </div>

                      <Input
                        id="calle"
                        label="Calle"
                        name="calle"
                        type="text"
                        onChange={onChangeField}
                        value={clienteEditable.calle || ''}
                      />

                      <Input
                        id="altura"
                        label="Altura"
                        name="altura"
                        type="text"
                        onChange={onChangeField}
                        value={clienteEditable.altura || ''}
                      />

                      <div className="flex items-center justify-between">
                        <div>
                          <Input
                            id="entre"
                            label="Entre"
                            name="ntre"
                            type="text"
                            onChange={onChangeField}
                            value={clienteEditable.entre || ''}
                          />
                        </div>
                        <div>
                          <Input
                            id="y"
                            label="Y"
                            name="y"
                            type="text"
                            onChange={onChangeField}
                            value={clienteEditable.y || ''}
                          />
                        </div>
                      </div>

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
