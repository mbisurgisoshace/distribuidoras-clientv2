import moment from 'moment';
import { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';
import {
  FilterIcon,
  CloudIcon,
  ClipboardListIcon,
  DatabaseIcon,
} from '@heroicons/react/outline';

import {
  flexRender,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

import FilterPanel from './FilterPanel';
import DataCell from './Cells/DataCell';
import HeaderCell from './Cells/HeaderCell';
import { useMonitorColumns } from './useMonitorColumns';
import Pagination from '../../../components/Table/Pagination';
import OptionsButton from '../../../components/OptionsButton';
import LoadingData from '../../../components/Table/LoadingData';
import ActualizacionMasiva from './ActualizacionMasiva';
import MovimientosService from '../../../services/MovimientosService';
import toaster from '../../../components/Toast/toaster';

interface MonitorPedidosProps {
  data: any[];
  isLoading: boolean;
  onSearch: (filters: any) => void;
}

export default function MonitorPedidos({
  data,
  isLoading,
  onSearch,
}: MonitorPedidosProps) {
  const { columns } = useMonitorColumns();
  const [filters, setFilters] = useState<any>({
    tipos: [],
    canal: [],
    estado: [],
    condicion: [],
    desde: new Date(),
    hasta: new Date(),
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isActualizacionMasivaOpen, setIsActualizacionMasivaOpen] =
    useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const onActualizarMasivo = async (actualizaciones: any) => {
    const selectedPedidosIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.MovimientoEncID);

    const actualizacionesMasivas: any = {};
    Object.keys(actualizaciones).forEach((key) => {
      if (actualizaciones[key] !== -1)
        actualizacionesMasivas[key] = actualizaciones[key];
    });

    try {
      if (selectedPedidosIds.length > 0) {
        await MovimientosService.updateMovimientosMasivo({
          ids: selectedPedidosIds,
          actualizaciones: actualizacionesMasivas,
        });

        table.reset();
        onSearch(filters);
        toaster().success({
          title: 'Actualizado correctamente!',
          infoText: 'Los pedidos fueron actualizados correctamente.',
        });
      }
    } catch (err) {
      console.log('err', err);
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'No se han podido actualizar masivamente los pedidos.',
      });
    }
  };

  return (
    <div className="flex flex-col h-full relative z-0 overflow-auto focus:outline-none xl:order-last md:rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Monitor de Pedidos
          </h2>
        </div>
        <div className="flex">
          <OptionsButton
            mainOption={{
              name: 'Filtrar',
              onClick: () => setIsFiltersOpen(true),
              icon: (
                <FilterIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              ),
            }}
            options={[
              {
                name: 'Generar Remitos',
                onClick: () => {},
                icon: (
                  <ClipboardListIcon className='className="-ml-1 mr-2 h-5 w-5 text-gray-500"' />
                ),
              },
              {
                name: 'Sincronizar Remitos',
                onClick: () => {},
                icon: (
                  <CloudIcon className='className="-ml-1 mr-2 h-5 w-5 text-gray-500"' />
                ),
              },
              {
                name: 'Actualizacion Masiva',
                onClick: () => setIsActualizacionMasivaOpen(true),
                icon: (
                  <DatabaseIcon className='className="-ml-1 mr-2 h-5 w-5 text-gray-500"' />
                ),
              },
            ]}
          />
        </div>
      </div>
      <FilterPanel
        filters={filters}
        isOpen={isFiltersOpen}
        setFilters={setFilters}
        onApplyFilter={(filters) => {
          onSearch({
            ...filters,
            desde: moment(filters.desde).format('DD-MM-YYYY'),
            hasta: moment(filters.hasta).format('DD-MM-YYYY'),
          });
          setIsFiltersOpen(false);
        }}
        onClose={() => setIsFiltersOpen(false)}
      />
      <ActualizacionMasiva
        isOpen={isActualizacionMasivaOpen}
        onClose={() => setIsActualizacionMasivaOpen(false)}
        onApplyActualizacion={(actualizaciones) =>
          onActualizarMasivo(actualizaciones)
        }
      />
      <div className="flex flex-col h-full mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <div className="flex-1 overflow-y-auto relative">
          {isLoading && <LoadingData />}
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <HeaderCell columnId={header.id}>
                        <div
                          className={`${
                            header.column.getCanSort() ? 'cursor-pointer' : ''
                          } ? 'cursor-pointer' : '' flex items-center`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {{
                            asc: (
                              <ArrowUpIcon className="ml-2 h-3.5 w-3.5 font-medium text-indigo-600" />
                            ),
                            desc: (
                              <ArrowDownIcon className="ml-2 h-3.5 w-3.5 font-medium text-indigo-600" />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </HeaderCell>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <DataCell id={cell.id} columnId={cell.column.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </DataCell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          pageSize={50}
          siblingsCount={1}
          totalCount={data.length}
          onNextPage={table.nextPage}
          onPreviousPage={table.previousPage}
          currentPage={table.getState().pagination.pageIndex + 1}
          onPageChange={(pageNumber) => {
            table.setPageIndex(pageNumber - 1);
          }}
        />
      </div>
    </div>
  );
}
