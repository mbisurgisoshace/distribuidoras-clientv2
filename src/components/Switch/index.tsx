import classNames from 'classnames';
import { Switch as HeadlessSwitch } from '@headlessui/react';

interface SwitchProps {
  id: string;
  name: string;
  label?: string;
  value: boolean;
  onChange: (name: string, value: boolean) => void;
}

export default function Switch({
  id,
  name,
  value,
  label,
  onChange,
}: SwitchProps): React.ReactElement {
  return (
    <HeadlessSwitch.Group as="div" className="flex items-center">
      <HeadlessSwitch
        checked={value}
        onChange={(checked) => onChange(name, checked)}
        className={classNames(
          value ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            value ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </HeadlessSwitch>
      {label && (
        <HeadlessSwitch.Label as="span" className="ml-3">
          <span className="text-sm font-medium text-gray-900">{label}</span>
        </HeadlessSwitch.Label>
      )}
    </HeadlessSwitch.Group>
  );
}
