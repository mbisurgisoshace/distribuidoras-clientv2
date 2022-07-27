import React from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';

import { classNames } from '../utils';

interface ISidebarItemChildren {
  name: string;
  href: string;
}

export interface ISidebarItem {
  name: string;
  icon: any;
  current: boolean;
  href?: string;
  children?: ISidebarItemChildren[];
}

interface SidebarItemProps {
  item: ISidebarItem;
}

export default function SidebarItem({
  item,
}: SidebarItemProps): React.ReactElement {
  return !item.children ? (
    <Link
      key={item.name}
      to={item.href as string}
      className={classNames(
        item.current
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
      )}
    >
      <item.icon
        className={classNames(
          item.current
            ? 'text-gray-500'
            : 'text-gray-400 group-hover:text-gray-500',
          'mr-3 flex-shrink-0 h-6 w-6'
        )}
        aria-hidden="true"
      />
      {item.name}
    </Link>
  ) : (
    <Disclosure as="div" key={item.name} className="space-y-1">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              item.current
                ? 'bg-gray-100 text-gray-900'
                : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            )}
          >
            <item.icon
              className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span className="flex-1">{item.name}</span>
            <svg
              className={classNames(
                open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
              )}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
            </svg>
          </Disclosure.Button>
          <Disclosure.Panel className="space-y-1">
            {item.children?.map((subItem) => (
              <Disclosure.Button
                key={subItem.name}
                as="a"
                //href={subItem.href}
                className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
              >
                <Link to={subItem.href}>{subItem.name}</Link>
              </Disclosure.Button>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
