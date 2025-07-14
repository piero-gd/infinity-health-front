import { toast as toastify } from 'react-toastify';
import type { Id } from 'react-toastify';
import { FaCheckCircle, FaExclamationTriangle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { CgFileDocument } from 'react-icons/cg';

//iconos para estado de toastify personalizado + uno nuevo de carga
const icons = {
  success: <FaCheckCircle className="text-xl text-[var(--toastify-color-success)] w-8 h-8" />,
  error: <FaExclamationCircle className="text-xl text-[var(--toastify-color-error)] w-8 h-8" />,
  warning: <FaExclamationTriangle className="text-xl text-[var(--toastify-color-warning)] w-8 h-8" />,
  info: <CgFileDocument className="text-xl text-[var(--toastify-color-info)] w-8 h-8" />,
  loading: <FaSpinner className="text-xl text-[var(--toastify-color-info)] w-8 h-8 animate-spin" />
} as const;

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

// Custom close button component
const CloseButton = ({ closeToast, type }: { closeToast: () => void; type: ToastType }) => {
  const colors = {
    success: 'var(--toastify-color-success)',
    error: 'var(--toastify-color-error)',
    warning: 'var(--toastify-color-warning)',
    info: 'var(--toastify-color-info)',
    loading: 'var(--toastify-color-info)'
  };

  return (
    <button
      onClick={closeToast}
      className="absolute top-2 right-2 p-1 transition-opacity hover:opacity-70"
      style={{ color: colors[type] }}
      aria-label="Cerrar notificación"
    >
      <IoClose className="text-xl" />
    </button>
  );
};

// Toast functions
export const toast = {
  ...toastify,

  loading: (title: string, description?: string): string => {
    const toastId = Math.random().toString(36).substring(2, 9);

    toastify(
      <div className="flex items-center">
        {icons.loading}
        <div className="ml-3">
          <span className="font-bold text-[var(--toastify-color-info)]">{title}</span>
          {description && <span className="block text-sm text-[var(--toastify-text-color)]">{description}</span>}
        </div>
      </div>,
      {
        toastId,
        closeButton: ({ closeToast }: { closeToast: () => void }) => (
          <CloseButton closeToast={closeToast} type="loading" />
        ),
        isLoading: true,
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );

    return toastId;
  },

  success: (title: string, description?: string) => {
    toastify.success(
      <div className="flex items-center">
        {icons.success}
        <div className="ml-3">
          <span className="font-bold text-[var(--toastify-color-success)]">{title}</span>
          {description && <span className="block text-sm text-[var(--toastify-text-color)]">{description}</span>}
        </div>
      </div>,
      {
        closeButton: ({ closeToast }: { closeToast: () => void }) => (
          <CloseButton closeToast={closeToast} type="success" />
        )
      }
    );
  },

  error: (title: string, description?: string) => {
    toastify.error(
      <div className="flex items-center">
        {icons.error}
        <div className="ml-3">
          <span className="font-bold text-[var(--toastify-color-error)]">{title}</span>
          {description && <span className="block text-sm text-[var(--toastify-text-color)]">{description}</span>}
        </div>
      </div>,
      {
        closeButton: ({ closeToast }: { closeToast: () => void }) => (
          <CloseButton closeToast={closeToast} type="error" />
        )
      }
    );
  },

  warning: (title: string, description?: string) => {
    toastify.warning(
      <div className="flex items-center">
        {icons.warning}
        <div className="ml-3">
          <span className="font-bold text-[var(--toastify-color-warning)]">{title}</span>
          {description && <span className="block text-sm text-[var(--toastify-text-color)]">{description}</span>}
        </div>
      </div>,
      {
        closeButton: ({ closeToast }: { closeToast: () => void }) => (
          <CloseButton closeToast={closeToast} type="warning" />
        )
      }
    );
  },

  info: (title: string, description?: string) => {
    toastify.info(
      <div className="flex items-center">
        {icons.info}
        <div className="ml-3">
          <span className="font-bold text-[var(--toastify-color-info)]">{title}</span>
          {description && <span className="block text-sm text-[var(--toastify-text-color)]">{description}</span>}
        </div>
      </div>,
      {
        closeButton: ({ closeToast }: { closeToast: () => void }) => (
          <CloseButton closeToast={closeToast} type="info" />
        )
      }
    );
  },
  
  dismiss: (toastId?: Id) => {
    toastify.dismiss(toastId);
  }
};

// Backward compatibility
export const showToast = toast;