import React from 'react';

interface HeaderCellProps {
  children: any;
  columnId: string;
}

export default function HeaderCell({
  children,
  columnId,
}: HeaderCellProps): React.ReactElement {
  const getHeaderCellClassnames = (columnId: string) => {
    if (columnId === 'HojaRutaID' || columnId === 'Fecha')
      return 'w-32 min-w-[8rem] px-3 py-3.5  text-left text-sm font-semibold text-gray-900 ';

    if (columnId === 'Chofer')
      return 'w-96 min-w-[24rem] max-w-[24rem] px-3 py-3.5  text-left text-sm font-semibold text-gray-900 ';

    if (
      columnId === 'ControlStock' ||
      columnId === 'CierreStock' ||
      columnId === 'Estado'
    )
      return 'w-32 min-w-[9rem] px-3 py-3.5  text-center text-sm font-semibold text-gray-900 ';

    return 'hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell';
  };

  return (
    <th key={columnId} className={getHeaderCellClassnames(columnId)}>
      {children}
    </th>
  );
}
