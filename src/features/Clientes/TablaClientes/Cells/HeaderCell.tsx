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
    if (columnId === 'cliente_id' || columnId === 'razon_social')
      return 'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6';

    if (columnId === 'actions') return 'relative py-3.5 pl-3 pr-4 sm:pr-6';

    return 'hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell';
  };

  return (
    <th key={columnId} className={getHeaderCellClassnames(columnId)}>
      {children}
    </th>
  );
}
