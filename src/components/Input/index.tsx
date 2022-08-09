import React from 'react';
import classNames from 'classnames';

interface InputProps {
  id: string;
  type: string;
  name: string;
  label: string;
  disabled?: boolean;
  value: string | number;
  onChange: (name: string, value: any) => void;
}

export default function Input({
  id,
  type,
  name,
  label,
  value,
  onChange,
  disabled = false,
}: InputProps): React.ReactElement {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        className={classNames(
          'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
          { 'bg-gray-50': disabled }
        )}
      />
    </>
  );
}
