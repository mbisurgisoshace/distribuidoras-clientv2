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
    if (columnId === 'HojaRutaID' || columnId === 'Fecha')
      return 'w-32 min-w-[8rem] px-3 py-3.5  text-left text-sm text-gray-900 ';

    if (columnId === 'Chofer')
      return 'w-96 min-w-[24rem] max-w-[24rem] px-3 py-3.5  text-left text-sm font-semibold text-gray-900 ';

    if (
      columnId === 'ControlStock' ||
      columnId === 'CierreStock' ||
      columnId === 'Estado'
    )
      return 'w-32 min-w-[9rem] px-3 py-3.5  text-left text-sm font-semibold text-gray-900 ';

    return 'hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell';
  };

  return (
    <td key={id} className={getDataCellClassnames(columnId)}>
      {children}
    </td>
  );
}
