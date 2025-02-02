import { useEffect, useRef } from "react";

type UseToastTimerOptions = {
  onClose: () => void;
  duration?: number;
};

export const useToastTimer = ({ onClose, duration }: UseToastTimerOptions) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>();

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const getTimer = () => {
    clearTimer();
    if (duration) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, duration);
    }
  };

  const handleOnClose = () => {
    clearTimer();
    onClose();
  };

  useEffect(() => {
    if (duration) {
      getTimer();
    }
    return clearTimer;
  }, [duration, onClose]);

  return { handleOnClose };
};
