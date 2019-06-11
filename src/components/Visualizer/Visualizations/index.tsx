import React from 'react';
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
    component: React.lazy(() => import('./Rain'))
  },
  {
    component: React.lazy(() => import('./Stars')),
    options: { smoothing: 128 }
  },
  {
    component: React.lazy(() => import('./Waveform'))
  },
  {
    component: React.lazy(() => import('./Drummer')),
    options: { smoothing: 64 }
  },
  {
    component: React.lazy(() => import('./Halpern'))
  }
];

export default visualizations;
