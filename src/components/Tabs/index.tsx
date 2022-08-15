import React from 'react';

import Select from '../Select';
import { classNames } from '../../layouts/utils';

interface Tab {
  value: string;
  label: string;
  current: boolean;
  disabled?: boolean;
  onClick: (tab: string) => void;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps): React.ReactElement {
  const onDropdownTabSelect = (selectedTab: string) => {
    const findTab = tabs.find((tab) => tab.value === selectedTab);
    if (findTab) findTab.onClick(selectedTab);
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Seleccionar
        </label>
        <Select
          id="tabs"
          label=""
          value={tabs.find((tab) => tab.current)?.value || -1}
          onOptionChange={(value) => onDropdownTabSelect(value as string)}
          options={tabs.map((tab) => ({ label: tab.label, value: tab.value }))}
        />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <span
                key={tab.label}
                onClick={() => !tab.disabled && tab.onClick(tab.value)}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm cursor-pointer',
                  tab.disabled
                    ? 'cursor-auto hover:border-none hover:text-gray-500'
                    : ''
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.label}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
