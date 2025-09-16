import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({
  open,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  centered = false,
  footer,
  closeOnClickOutside = true,
}) => {
  const cancelButtonRef = useRef(null);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const sizeClass = sizes[size] || sizes.md;
  const alignClass = centered ? 'items-center' : 'items-start';

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        initialFocus={cancelButtonRef}
        onClose={closeOnClickOutside ? onClose : () => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-secondary-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className={`flex min-h-full justify-center p-4 text-center ${alignClass} sm:p-0`}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={`relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all my-8 w-full ${sizeClass}`}>
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="px-6 py-4 border-b border-secondary-200 flex items-center justify-between">
                    {title && (
                      <Dialog.Title className="text-lg font-semibold text-secondary-900">
                        {title}
                      </Dialog.Title>
                    )}
                    {showCloseButton && (
                      <button
                        type="button"
                        className="rounded-md bg-white text-secondary-400 hover:text-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                )}
                
                {/* Content */}
                <div className="px-6 py-4">
                  {children}
                </div>
                
                {/* Footer */}
                {footer && (
                  <div className="px-6 py-4 border-t border-secondary-200 bg-secondary-50">
                    {footer}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
