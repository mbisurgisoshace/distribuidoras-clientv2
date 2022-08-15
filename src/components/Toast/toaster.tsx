import React from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
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
    createRoot(document.createElement('div')).render(
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
      )
    );
  };

  const error = (config: ToasterProps) => {
    createRoot(document.createElement('div')).render(
      createPortal(
        <Toast
          icon={
            <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
          }
          title={config.title}
          infoText={config.infoText}
        />,
        notificationWrapper
      )
    );
  };

  return {
    error,
    success,
  };
}
