import { ActionConstants, ActionUnionType } from './types';

export const beginVisualizationTransition = (): ActionUnionType => ({
  type: ActionConstants.BEGIN_VISUALIZATION_TRANSITION
});

export const endVisualizationTransition = (): ActionUnionType => ({
  type: ActionConstants.END_VISUALIZATION_TRANSITION
});

export const goToNextVisualization = (): ActionUnionType => ({
  type: ActionConstants.GO_TO_NEXT_VISUALIZATION
});

export const goToPrevVisualization = (): ActionUnionType => ({
  type: ActionConstants.GO_TO_PREV_VISUALIZATION
});

export const setQuality = (quality: number): ActionUnionType => ({
  type: ActionConstants.SET_QUALITY,
  quality
});
