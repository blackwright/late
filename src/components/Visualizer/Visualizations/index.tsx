import Waveform from './Waveform';
import Drummer from './Drummer';
import Halpern from './Halpern';
import Stars from './Stars';
import Rain from './Rain';
import { Props } from './VisualizationHOC';

export type QualitySettings = {
  [quality: number]: { [setting: string]: any };
};

export type Options = {
  smoothing?: number;
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
