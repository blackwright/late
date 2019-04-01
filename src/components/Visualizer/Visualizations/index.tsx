import Waveform from './Waveform/Waveform';
import Drummer from './Drummer/Drummer';
import Halpern from './Halpern/Halpern';
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
    options: { smoothing: 200 }
  },
  {
    component: Halpern,
    options: {
      smoothing: 128,
      mobileDisabled: true
    }
  }
];

export default visualizations;

export const MobileDisabled: SelectableVisualization = {
  component: MobileDisabledComponent
};
