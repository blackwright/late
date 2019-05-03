import Waveform from './Waveform';
import Drummer from './Drummer';
import Halpern from './Halpern';
import Stars from './Stars';
import Rain from './Rain';
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
    component: Rain
  },
  {
    component: Stars,
    options: { smoothing: 128 }
  },
  {
    component: Waveform
  },
  {
    component: Drummer,
    options: { smoothing: 64 }
  },
  {
    component: Halpern
  }
];

export default visualizations;

export const MobileDisabled: SelectableVisualization = {
  component: MobileDisabledComponent
};
