import moment from 'moment';
import { Fragment, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';

import Input from '../../../components/Input';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filters: any) => void;
}

export default function FilterPanel({
  isOpen,
  onClose,
  onApplyFilter,
}: FilterPanelProps): React.ReactElement {
  const [filters, setFilters] = useState({
    desde: moment().format('DD-MM-YYYY'),
    hasta: moment().format('DD-MM-YYYY'),
  });

  const onFiltrar = (e: any) => {
    e.preventDefault();
    onApplyFilter(filters);
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
                      <Input
                        id="desde"
                        name="desde"
                        label="Desde"
                        type="text"
                        value={filters.desde}
                        onChange={(name, value) => {
                          setFilters({
                            ...filters,
                            [name]: value,
                          });
                        }}
                      />
                      <Input
                        id="hasta"
                        name="hasta"
                        label="Hasta"
                        type="text"
                        value={filters.hasta}
                        onChange={(name, value) => {
                          setFilters({
                            ...filters,
                            [name]: value,
                          });
                        }}
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