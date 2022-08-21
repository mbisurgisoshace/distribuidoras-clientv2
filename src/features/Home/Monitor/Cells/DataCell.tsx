import React from 'react';

interface DataCellProps {
  id: string;
  children: any;
  columnId: string;
}

export default function DataCell({
  id,
  children,
  columnId,
}: DataCellProps): React.ReactElement {
  const getDataCellClassnames = (columnId: string) => {
    if (columnId === 'MovimientoEncID' || columnId === 'Fecha')
      return 'w-32 min-w-[8rem] px-3 py-1 text-sm text-gray-500';

    if (columnId === 'ClienteID')
      return 'w-96 min-w-[24rem] max-w-[24rem] px-3 py-1 text-sm text-gray-500';

    if (
      columnId === 'TipoMovimientoNombre' ||
      columnId === 'CondicionVentaNombre' ||
      columnId === 'EstadoMovimientoNombre' ||
      columnId === 'Apellido'
    )
      return 'w-52 min-w-[13rem] px-3 py-1 text-sm text-gray-500';

    if (columnId === 'Observaciones')
      return 'w-96 min-w-[24rem] px-3 py-1 text-sm text-gray-500';

    return 'hidden px-3 py-1 text-sm text-gray-500 sm:table-cell';
  };

  return (
    <td key={id} className={getDataCellClassnames(columnId)}>
      {children}
    </td>
  );
}
