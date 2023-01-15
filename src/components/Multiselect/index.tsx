import { SelectorIcon } from '@heroicons/react/solid';
import { Listbox, Transition } from '@headlessui/react';
import React, { useState, useEffect, Fragment, useCallback } from 'react';

import { classNames } from '../../layouts/utils';

interface Option {
  label: string;
  value: number | string;
}

interface MultiselectProps {
  id: string;
  label: string;
  error?: string;
  options: Option[];
  showsError?: boolean;
  values: number[] | string[];
  onOptionsChange: (values: number[] | string[]) => void;
}

export default function Multiselect({
  id,
  label,
  error,
  values,
  options,
  onOptionsChange,
  showsError = true,
}: MultiselectProps): React.ReactElement {
  const getOptions = useCallback(
    (optionsId: any) => {
      return options.filter((option) => optionsId.includes(option.value));
    },
    [options]
  );

  const [selected, setSelected] = useState<Option[]>([]);

  useEffect(() => {
    setSelected(getOptions(values));
  }, [values, getOptions]);

  return (
    <Listbox
      value={selected}
      onChange={(options) => {
        setSelected(options);
        onOptionsChange(
          options.map((option) => option.value) as string[] | number[]
        );
      }}
      multiple
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">
                {selected.length === 0
                  ? 'Seleccionar...'
                  : selected.map((option) => option.label).join(', ')}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex items-center">
                        <input
                          readOnly
                          id="selected"
                          name="selected"
                          type="checkbox"
                          checked={selected}
                          className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {option.label}
                        </span>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
            {showsError && (
              <p className="mt-1 text-xs text-red-600 h-4" id={id}>
                {error || ' '}
              </p>
            )}
          </div>
        </>
      )}
    </Listbox>
  );
}
