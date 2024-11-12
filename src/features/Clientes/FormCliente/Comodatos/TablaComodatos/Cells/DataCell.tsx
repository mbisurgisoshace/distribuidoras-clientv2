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
    if (columnId === 'monto' || columnId === 'tipo_movimiento_nombre')
      return 'px-3 py-4 text-sm text-gray-500';

    if (columnId === 'comodato_enc_id')
      return 'py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6';

    if (columnId === 'actions')
      return 'py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6';

    return 'hidden px-3 py-4 text-sm text-gray-500 sm:table-cell';
  };

  return (
    <td key={id} className={getDataCellClassnames(columnId)}>
      {children}
    </td>
  );
}
