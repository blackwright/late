import { ActionConstants, ActionUnionType, Quality } from './types';

export const goToNextVisualization = (): ActionUnionType => ({
  type: ActionConstants.GO_TO_NEXT_VISUALIZATION
});

export const goToPrevVisualization = (): ActionUnionType => ({
  type: ActionConstants.GO_TO_PREV_VISUALIZATION
});

export const setQuality = (quality: Quality): ActionUnionType => ({
  type: ActionConstants.SET_QUALITY,
  quality
});
