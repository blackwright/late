export type Quality = 0 | 1 | 2;

export type StoreState = {
  currentVisualizationIndex: number;
  prevVisualizationIndex: number;
  quality: Quality;
};

export enum ActionConstants {
  BEGIN_VISUALIZATION_TRANSITION = 'BEGIN_VISUALIZATION_TRANSITION',
  END_VISUALIZATION_TRANSITION = 'END_VISUALIZATION_TRANSITION',
  GO_TO_PREV_VISUALIZATION = 'GO_TO_PREV_VISUALIZATION',
  GO_TO_NEXT_VISUALIZATION = 'GO_TO_NEXT_VISUALIZATION',
  SET_QUALITY = 'SET_QUALITY'
}

interface GoToNextVisualizationAction {
  type: typeof ActionConstants.GO_TO_NEXT_VISUALIZATION;
}

interface GoToPrevVisualizationAction {
  type: typeof ActionConstants.GO_TO_PREV_VISUALIZATION;
}

interface SetQualityAction {
  type: typeof ActionConstants.SET_QUALITY;
  quality: Quality;
}

export type ActionUnionType =
  | GoToNextVisualizationAction
  | GoToPrevVisualizationAction
  | SetQualityAction;
