import moment from 'moment';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/table-core';
import { useNavigate } from 'react-router-dom';
import { LockOpenIcon, DocumentRemoveIcon } from '@heroicons/react/outline';
import { useAuth } from '../../Auth/AuthProvider';
import HojasService from '../../../services/HojasService';
import toaster from '../../../components/Toast/toaster';

export const useHojasColumns = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const onDeleteHoja = async (hojaId: number) => {
    await HojasService.borrarHoja(hojaId);
    toaster().success({
      title: 'Hoja de Ruta eliminada!',
      infoText: 'La hoja de ruta ha sido eliminada correctamente.',
    });
    window.location.reload();
  };

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: 'HojaRutaID',
        header: 'Hoja de Ruta #',
        cell: (props) => (
          <span
            onClick={() => navigate(`/hojas/${props.getValue()}`)}
            className="cursor-pointer hover:underline hover:text-indigo-500"
          >
            {props.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'Apellido',
        header: 'Chofer',
        cell: (props) => {
          if (!props.row.original.Apellido && !props.row.original.Nombre) {
            return '-';
          }

          return `${props.row.original.Apellido}, ${props.row.original.Nombre}`;
        },
      },
      {
        accessorKey: 'Fecha',
        header: 'Fecha',
        cell: (props) => {
          const fecha = moment(props.getValue() as string)
            .utc()
            .format('DD/MM/YYYY');

          return fecha;
        },
      },
      {
        accessorKey: 'ControlStock',
        header: 'Control de Stock',
        cell: (props) => {
          let color = 'bg-red-500';
          if (props.row.original.ControlStock) {
            color = 'bg-green-500';
          }
          return (
            <div className="flex justify-center items-center">
              <div className={`w-2.5 h-2.5 rounded-lg ${color} mr-2`} />
            </div>
          );
        },
      },
      {
        accessorKey: 'CierreStock',
        header: 'Cierre de Stock',
        cell: (props) => {
          let color = 'bg-red-500';
          if (props.row.original.CierreStock) {
            color = 'bg-green-500';
          }
          return (
            <div className="flex justify-center items-center">
              <div className={`w-2.5 h-2.5 rounded-lg ${color} mr-2`} />
            </div>
          );
        },
      },
      {
        accessorKey: 'Estado',
        header: 'Estado',
        cell: (props) => {
          let color = 'bg-red-500';
          if (props.row.original.Estado) {
            color = 'bg-green-500';
          }
          return (
            <div className="flex justify-center items-center">
              <div className={`w-2.5 h-2.5 rounded-lg ${color} mr-2`} />
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: '',
        cell: (props) => (
          <div className="flex justify-center items-center gap-2">
            <button
              type="button"
              disabled={props.row.original.Estado}
              className={`rounded-full bg-white p-1 ${
                props.row.original.Estado
                  ? 'text-gray-500'
                  : 'text-indigo-500 hover:text-indigo-700'
              }`}
            >
              <LockOpenIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            {auth.user && auth.user.rol === 'admin' && (
              <button
                type="button"
                onClick={() => onDeleteHoja(props.row.original.HojaRutaID)}
                className={`rounded-full bg-white p-1 text-red-500 hover:text-red-700 cursor-pointer`}
              >
                <DocumentRemoveIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            )}
          </div>
        ),
      },
    ],
    [auth.user]
  );

  return { columns };
};
