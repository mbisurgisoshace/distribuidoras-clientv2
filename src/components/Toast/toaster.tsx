import React from 'react';
import { render, createPortal } from 'react-dom';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';

import Toast from './index';

interface ToasterProps {
  title: string;
  infoText?: string;
}

export default function toaster() {
  const notificationWrapper = document.getElementById(
    'notification-container'
  ) as HTMLDivElement;

  const success = (config: ToasterProps) => {
    render(
      createPortal(
        <Toast
          icon={
            <CheckCircleIcon
              className="h-6 w-6 text-green-400"
              aria-hidden="true"
            />
          }
          title={config.title}
          infoText={config.infoText}
        />,
        notificationWrapper
      ),
      document.createElement('div')
    );
  };

  const error = (config: ToasterProps) => {
    render(
      createPortal(
        <Toast
          icon={
            <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
          }
          title={config.title}
          infoText={config.infoText}
        />,
        notificationWrapper
      ),
      document.createElement('div')
    );
  };

  return {
    error,
    success,
  };
}
