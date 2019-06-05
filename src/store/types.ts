export type StoreState = {
  currentVisualizationIndex: number;
  prevVisualizationIndex: number;
};

export enum ActionConstants {
  BEGIN_VISUALIZATION_TRANSITION = 'BEGIN_VISUALIZATION_TRANSITION',
  END_VISUALIZATION_TRANSITION = 'END_VISUALIZATION_TRANSITION',
  GO_TO_PREV_VISUALIZATION = 'GO_TO_PREV_VISUALIZATION',
  GO_TO_NEXT_VISUALIZATION = 'GO_TO_NEXT_VISUALIZATION'
}

interface GoToNextVisualizationAction {
  type: typeof ActionConstants.GO_TO_NEXT_VISUALIZATION;
}

interface GoToPrevVisualizationAction {
  type: typeof ActionConstants.GO_TO_PREV_VISUALIZATION;
}

export type ActionUnionType =
  | GoToNextVisualizationAction
  | GoToPrevVisualizationAction;
