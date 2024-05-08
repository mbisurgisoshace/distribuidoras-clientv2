import moment from 'moment';
import { Fragment } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';

import Datepicker from '../../../components/Datepicker';
import Multiselect from '../../../components/Multiselect';

import { useTablas } from '../../../hooks/useTablas';

interface FilterPanelProps {
  filters: any;
  isOpen: boolean;
  onClose: () => void;
  setFilters: (filters: any) => void;
  onApplyFilter: (filters: any) => void;
}

export default function FilterPanel({
  isOpen,
  onClose,
  filters,
  setFilters,
  onApplyFilter,
}: FilterPanelProps): React.ReactElement {
  const { tablas } = useTablas(
    'canales,condicionesVenta,tiposMovimiento,estadosMovimiento,choferes'
  );

  const onFiltrar = (e: any) => {
    e.preventDefault();
    onApplyFilter(filters);
  };
  console.log('tablas', tablas);

  console.log('filters', filters);

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
                          Filtros
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
                      onSubmit={onFiltrar}
                    >
                      <Datepicker
                        id="desde"
                        name="desde"
                        label="Desde"
                        value={filters.desde}
                        onChange={(date) => {
                          setFilters({
                            ...filters,
                            desde: date,
                          });
                        }}
                      />
                      <Datepicker
                        id="hasta"
                        name="hasta"
                        label="Hasta"
                        value={filters.hasta}
                        onChange={(date) => {
                          setFilters({
                            ...filters,
                            hasta: date,
                          });
                        }}
                      />
                      <Multiselect
                        id="estados"
                        label="Estados"
                        onOptionsChange={(options) => {
                          setFilters({
                            ...filters,
                            estado: options,
                          });
                        }}
                        options={tablas.estadosMovimiento.map(
                          (estado: any) => ({
                            label: estado.estado_movimiento_nombre,
                            value: estado.estado_movimiento_id,
                          })
                        )}
                        values={filters.estado}
                      />
                      <Multiselect
                        id="canales"
                        label="Canales"
                        onOptionsChange={(options) => {
                          setFilters({
                            ...filters,
                            canal: options,
                          });
                        }}
                        options={tablas.canales.map((canal: any) => ({
                          label: canal.canal_nombre,
                          value: canal.canal_id,
                        }))}
                        values={filters.canal}
                      />
                      <Multiselect
                        id="tipos"
                        label="Tipos Movimiento"
                        onOptionsChange={(options) => {
                          setFilters({
                            ...filters,
                            tipos: options,
                          });
                        }}
                        options={tablas.tiposMovimiento.map((tipo: any) => ({
                          label: tipo.tipo_movimiento_nombre,
                          value: tipo.tipo_movimiento_id,
                        }))}
                        values={filters.tipos}
                      />
                      <Multiselect
                        id="condiciones"
                        label="Condiciones de Venta"
                        onOptionsChange={(options) => {
                          setFilters({
                            ...filters,
                            condicion: options,
                          });
                        }}
                        options={tablas.condicionesVenta.map(
                          (condicion: any) => ({
                            label: condicion.condicion_venta_nombre,
                            value: condicion.condicion_venta_id,
                          })
                        )}
                        values={filters.condicion}
                      />
                      <Multiselect
                        id="choferes"
                        label="Choferes"
                        onOptionsChange={(options) => {
                          setFilters({
                            ...filters,
                            chofer: options,
                          });
                        }}
                        options={tablas.choferes.map((chofer: any) => ({
                          label: `${chofer.nombre}, ${chofer.apellido}`,
                          value: chofer.chofer_id,
                        }))}
                        values={filters.chofer}
                      />
                      <button
                        type="submit"
                        //disabled={isLoading}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Buscar
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
