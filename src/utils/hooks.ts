import React, { useState, useEffect, useRef } from 'react';
import { debounced } from '../utils';

export function useStateRef<S>(
  initialState: S | (() => S)
): [S, React.Dispatch<React.SetStateAction<S>>, React.MutableRefObject<S>] {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return [state, setState, stateRef];
}

export function useDebouncedResize(
  fn: React.EffectCallback,
  deps?: React.DependencyList
) {
  useEffect(() => {
    fn();
    const debouncedFn = debounced(fn);

    window.addEventListener('resize', debouncedFn);
    return () => window.removeEventListener('resize', debouncedFn);
  }, deps);
}
