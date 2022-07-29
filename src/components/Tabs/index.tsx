import React from 'react';
import { classNames } from '../../layouts/utils';

interface Tab {
  value: string;
  label: string;
  current: boolean;
  onClick: (tab: string) => void;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps): React.ReactElement {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Seleccionar
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        {/* <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current)?.label}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select> */}
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <span
                key={tab.label}
                onClick={() => tab.onClick(tab.value)}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm cursor-pointer'
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
