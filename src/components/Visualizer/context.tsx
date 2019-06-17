import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  Dispatch
} from 'react';

type VisualizationContextState = {
  currentVisualizationIndex: number;
  prevVisualizationIndex: number;
};

type Action = {
  type: 'INCREMENT' | 'DECREMENT';
};

const initialState: VisualizationContextState = {
  currentVisualizationIndex: 0,
  prevVisualizationIndex: 0
};

const VisualizationContext = createContext(initialState);

function visualizationContextReducer(
  state: VisualizationContextState,
  action: Action
) {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        currentVisualizationIndex: state.currentVisualizationIndex + 1,
        prevVisualizationIndex: state.currentVisualizationIndex
      };
    }

    case 'DECREMENT': {
      return {
        currentVisualizationIndex: state.currentVisualizationIndex - 1,
        prevVisualizationIndex: state.currentVisualizationIndex
      };
    }

    default:
      return state;
  }
}

export function VisualizationContextProvider(props: any) {
  const [state, dispatch] = useReducer(
    visualizationContextReducer,
    initialState
  );
  const value = useMemo(() => [state, dispatch], [state]);
  return <VisualizationContext.Provider value={value} {...props} />;
}

export function useVisualizationContext() {
  const [state, dispatch]: [
    VisualizationContextState,
    Dispatch<Action>
  ] = useContext(VisualizationContext) as any;

  const goToPrevVisualization = () => dispatch({ type: 'DECREMENT' });
  const goToNextVisualization = () => dispatch({ type: 'INCREMENT' });

  return {
    visualizationIndexState: state,
    goToPrevVisualization,
    goToNextVisualization
  };
}
