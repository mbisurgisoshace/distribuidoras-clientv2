import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import { classNames } from '../../layouts/utils';

interface Option {
  icon?: any;
  name: string;
  onClick: () => void;
}

interface OptionsButtonProps {
  mainOption: Option;
  options: Option[];
}

export default function OptionsButton({
  options,
  mainOption,
}: OptionsButtonProps): React.ReactElement {
  return (
    <div className="relative z-10 inline-flex shadow-sm rounded-md">
      <button
        type="button"
        onClick={mainOption.onClick}
        className="relative inline-flex items-center px-4 py-2 rounded-l-md border text-white border-indigo-500 bg-indigo-500 text-sm font-medium hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {mainOption.icon && mainOption.icon}
        {mainOption.name}
      </button>
      <Menu as="div" className="-ml-px relative block">
        <Menu.Button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-l-gray-300  border-indigo-500 bg-indigo-500 text-sm font-medium text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
          <span className="sr-only">Open options</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-1 mt-2 -mr-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {options.map((option) => (
                <Menu.Item key={option.name}>
                  {({ active }) => (
                    <>
                      <span
                        onClick={option.onClick}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'px-4 py-2 text-sm cursor-pointer inline-flex items-center'
                        )}
                      >
                        {option.icon && option.icon}
                        {option.name}
                      </span>
                    </>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
