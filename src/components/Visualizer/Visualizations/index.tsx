import Waveform from './Waveform';
import Drummer from './Drummer';
import Halpern from './Halpern';
import Stars from './Stars';
import MobileDisabledComponent from './MobileDisabled';
import { Props } from './VisualizationHOC';
import { isMobileDevice as isMobileDeviceCheck } from '../../../utils';

export const isMobileDevice = isMobileDeviceCheck();

export type QualitySettings = {
  [quality: number]: { [setting: string]: any };
};

export type Options = {
  smoothing?: number;
  mobileDisabled?: boolean;
};

export type SelectableVisualization = {
  component: React.ComponentType<Props>;
  options?: Options;
};

const visualizations: SelectableVisualization[] = [
  {
    component: Stars,
    options: { smoothing: 128 }
  },
  {
    component: Waveform
  },
  {
    component: Halpern
  },
  {
    component: Drummer,
    options: { smoothing: 64 }
  }
];

export default visualizations;

export const MobileDisabled: SelectableVisualization = {
  component: MobileDisabledComponent
};
