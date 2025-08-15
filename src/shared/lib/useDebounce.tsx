import { useCallback, useEffect, useRef } from 'react';

function useDebounce<T>(callback: () => void, delay: number, deps: T[]) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => {
    cancel();
    timer.current = setTimeout(callback, delay);

    return cancel;
  }, deps);

  return { cancel };
}

export default useDebounce;
