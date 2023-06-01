import React from 'react';

interface InputProps {
  id: string;
  name: string;
  disabled?: boolean;
  value: string | number;
  onChange: (name: string, value: any) => void;
}

export default function NumberInput({
                                        id,
                                        name,
                                        value,
                                        onChange,
                                        disabled = false,
                                      }: InputProps): React.ReactElement {
  return (
    <div className="relative rounded-md shadow-sm">
      <input
        id={id}
        type='text'
        name={name}
        value={value}
        placeholder="0.00"
        disabled={disabled}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${disabled ? 'disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200' : ''}`}
      />
    </div>
  );
}
