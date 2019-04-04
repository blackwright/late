import Waveform from './Waveform';
import Drummer from './Drummer';
import Halpern from './Halpern';
import MobileDisabledComponent from './MobileDisabled';
import { Props } from './VisualizationHOC';
import { isMobileDevice as isMobileDeviceCheck } from '../../../utils';

export const isMobileDevice = isMobileDeviceCheck();

export type Options = {
  smoothing?: number;
  mobileDisabled?: boolean;
};

type SelectableVisualization = {
  component: React.ComponentType<Props>;
  options?: Options;
};

const visualizations: SelectableVisualization[] = [
  { component: Waveform },
  {
    component: Drummer,
    options: { smoothing: 64 }
  },
  {
    component: Halpern,
    options: {
      smoothing: 64,
      mobileDisabled: true
    }
  }
];

export default visualizations;

export const MobileDisabled: SelectableVisualization = {
  component: MobileDisabledComponent
};
