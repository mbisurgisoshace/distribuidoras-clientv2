import React from 'react';
import classNames from 'classnames';
import { Combobox } from '@headlessui/react';
import Spinner from '../Spinner';
import { SearchIcon } from '@heroicons/react/outline';

interface Option {
  label: string;
  value: number | string;
}

interface AutocompleteProps {
  label?: string;
  loading?: boolean;
  options: Option[];
  placeholder?: string;
  value: number | string;
  onQueryChange: (value: string) => void;
  onOptionChange: (value: number | string) => void;
}

export default function Autocomplete({
  value,
  label,
  options,
  loading,
  placeholder,
  onQueryChange,
  onOptionChange,
}: AutocompleteProps): React.ReactElement {
  return (
    <Combobox as="div" value={value} onChange={onOptionChange}>
      {label && (
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          {label}
        </Combobox.Label>
      )}
      <div className="relative mt-1">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Combobox.Input
            placeholder={placeholder}
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            displayValue={(option: Option) => option.label}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          {loading && (
            <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <Spinner />
            </div>
          )}
        </div>
        {options.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Combobox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected && 'font-semibold'
                      )}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h6 className="text-gray-400 font-semibold">
                          {option.value}
                        </h6>
                        {option.label}
                      </div>
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      />
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
        {options.length === 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Combobox.Option
              disabled
              key="sin"
              value={'sin'}
              className={({ active }) =>
                classNames('relative cursor-default select-none py-2 pl-3 pr-9')
              }
            >
              <span className={'block truncate text-red-600'}>
                La busqueda no arrojo resultados...
              </span>
            </Combobox.Option>
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
