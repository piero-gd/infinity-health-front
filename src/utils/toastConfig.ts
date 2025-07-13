import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

type ToastType = 'success' | 'error' | 'warning' | 'info';

const getToastConfig = (type: ToastType): ToastOptions => {
  const baseConfig: ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
    className: `custom-toast ${type}-toast`,
  };

  return baseConfig;
};

export const showToast = (type: ToastType, message: string, options: Partial<ToastOptions> = {}) => {
  const config = {
    ...getToastConfig(type),
    ...options,
  };
  
  toast(message, config);
};

// Métodos de conveniencia
export const toastSuccess = (message: string, options?: Partial<ToastOptions>) => 
  showToast('success', message, options);

export const toastError = (message: string, options?: Partial<ToastOptions>) => 
  showToast('error', message, options);

export const toastWarning = (message: string, options?: Partial<ToastOptions>) => 
  showToast('warning', message, options);

export const toastInfo = (message: string, options?: Partial<ToastOptions>) => 
  showToast('info', message, options);
