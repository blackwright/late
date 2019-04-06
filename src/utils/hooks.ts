import React, { useState, useEffect, useRef } from 'react';

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
