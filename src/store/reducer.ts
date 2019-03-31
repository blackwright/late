import { StoreState, ActionConstants, ActionUnionType } from './types';

const initialState: StoreState = {
  currentVisualizationIndex: 0,
  prevVisualizationIndex: 0,
  isTransitioning: false
};

export default function reducer(
  state = initialState,
  action: ActionUnionType
): StoreState {
  switch (action.type) {
    case ActionConstants.GO_TO_NEXT_VISUALIZATION:
      if (state.isTransitioning) {
        return state;
      }
      return {
        ...state,
        currentVisualizationIndex: state.currentVisualizationIndex + 1,
        prevVisualizationIndex: state.currentVisualizationIndex
      };

    case ActionConstants.GO_TO_PREV_VISUALIZATION:
      if (state.isTransitioning) {
        return state;
      }
      return {
        ...state,
        currentVisualizationIndex: state.currentVisualizationIndex - 1,
        prevVisualizationIndex: state.currentVisualizationIndex
      };

    case ActionConstants.BEGIN_VISUALIZATION_TRANSITION:
      return {
        ...state,
        isTransitioning: true
      };

    case ActionConstants.END_VISUALIZATION_TRANSITION:
      return {
        ...state,
        isTransitioning: false
      };

    default:
      return state;
  }
}
