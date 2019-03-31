export type StoreState = {
  currentVisualizationIndex: number;
  prevVisualizationIndex: number;
  isTransitioning: boolean;
};

export enum ActionConstants {
  BEGIN_VISUALIZATION_TRANSITION = 'BEGIN_VISUALIZATION_TRANSITION',
  END_VISUALIZATION_TRANSITION = 'END_VISUALIZATION_TRANSITION',
  GO_TO_PREV_VISUALIZATION = 'GO_TO_PREV_VISUALIZATION',
  GO_TO_NEXT_VISUALIZATION = 'GO_TO_NEXT_VISUALIZATION'
}

interface BeginVisualizationTransitionAction {
  type: typeof ActionConstants.BEGIN_VISUALIZATION_TRANSITION;
}

interface EndVisualizationTransitionAction {
  type: typeof ActionConstants.END_VISUALIZATION_TRANSITION;
}

interface GoToNextVisualizationAction {
  type: typeof ActionConstants.GO_TO_NEXT_VISUALIZATION;
}

interface GoToPrevVisualizationAction {
  type: typeof ActionConstants.GO_TO_PREV_VISUALIZATION;
}

export type ActionUnionType =
  | BeginVisualizationTransitionAction
  | EndVisualizationTransitionAction
  | GoToNextVisualizationAction
  | GoToPrevVisualizationAction;
