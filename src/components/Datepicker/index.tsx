import moment from 'moment';
import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import './styles.css';

interface DatePickerProps {
  id: string;
  value: Date;
  name: string;
  label: string;
  error?: string;
  onChange: (value: Date) => void;
}

const DatePickerInput = forwardRef((props: any, ref: any) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <input
        {...props}
        id={props.id}
        ref={ref}
        name={props.id}
        className={
          'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
        }
      />
      <p className="mt-1 text-xs text-red-600 h-4" id={props.id}>
        {props.error || ' '}
      </p>
    </>
  );
});

const DatePickerHeader = ({ date, decreaseMonth, increaseMonth }: any) => {
  const month = moment(date).format('MMMM');

  return (
    <div className="flex items-center text-gray-900">
      <button
        type="button"
        onClick={decreaseMonth}
        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="flex-auto font-semibold">{month}</div>
      <button
        type="button"
        onClick={increaseMonth}
        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Next month</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default function Datepicker({
  id,
  name,
  value,
  label,
  error,
  onChange,
}: DatePickerProps): React.ReactElement {
  return (
    <ReactDatePicker
      locale={'es-AR'}
      selected={value}
      dateFormat={'dd/MM/yyyy'}
      onChange={onChange}
      showPopperArrow={false}
      customInput={
        <DatePickerInput
          id={id}
          name={name}
          label={label}
          type={'text'}
          error={error}
        />
      }
      renderCustomHeader={DatePickerHeader}
      popperModifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, -25],
          },
        }
      ]}
    />
  );
}
