import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

// Creamos el contexto para manejar el toast
const ToastContext = createContext();

// Componente proveedor del ToastContext
export const ToastProvider = ({ children }) => {
  const showToast = (message, type = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warn':
        toast.warn(message);
        break;
      default:
        toast.info(message);
    }
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
    </ToastContext.Provider>
  );
};

// Hook para usar el toast en otros componentes
export const useToast = () => {
  return useContext(ToastContext);
};
