import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useToast = () => {
  const success = useCallback(
    msg =>
      toast.success(msg, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      }),
    [],
  );

  const error = useCallback(
    msg =>
      toast.error(msg, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      }),
    [],
  );

  return { successToast: success, errorToast: error };
};
