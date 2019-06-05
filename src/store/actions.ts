import { ActionConstants, ActionUnionType } from './types';

export const goToNextVisualization = (): ActionUnionType => ({
  type: ActionConstants.GO_TO_NEXT_VISUALIZATION
});

export const goToPrevVisualization = (): ActionUnionType => ({
  type: ActionConstants.GO_TO_PREV_VISUALIZATION
});
