import React, { Suspense, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import * as VisualizationHOC from './Visualizations/VisualizationHOC';
import LoadingVisualization from './Visualizations/LoadingVisualization';
import { useVisualizationContext } from './context';
import visualizations from './Visualizations';
import { modulo } from '../../utils';

type Props = Pick<VisualizationHOC.Props, 'data' | 'lowPassData'>;

type StyledProps = Props & {
  style: React.CSSProperties;
};

const styledVisualizations = visualizations.map(vis => {
  return (props: StyledProps) => {
    const { style, ...rest } = props;

    return (
      <animated.div className="visualization" style={props.style}>
        <vis.component {...rest} options={vis.options} />
      </animated.div>
    );
  };
});

const VisualizationSelector: React.FC<Props> = ({ data, lowPassData }) => {
  const { visualizationIndexState } = useVisualizationContext();
  const {
    prevVisualizationIndex,
    currentVisualizationIndex
  } = visualizationIndexState;

  const visIndex = modulo(currentVisualizationIndex, visualizations.length);

  const direction = useCallback((current?, prev?) => {
    let translateXMultiplier = 0;

    if (current < prev) {
      translateXMultiplier = 1;
    } else if (prev < current) {
      translateXMultiplier = -1;
    }

    return `translate3d(${100 * translateXMultiplier}%, 0, 0)`;
  }, []);

  const transitions = useTransition(visIndex, null, {
    from: {
      transform: direction(currentVisualizationIndex, prevVisualizationIndex)
    },
    enter: { transform: direction() },
    leave: {
      transform: direction(prevVisualizationIndex, currentVisualizationIndex)
    },
    initial: { transform: direction(0, -1) }
  });

  return (
    <Suspense fallback={<LoadingVisualization />}>
      {transitions.map(({ item, props, key }) => {
        const Visualization = styledVisualizations[item];
        return (
          <Visualization
            key={key}
            data={data}
            lowPassData={lowPassData}
            style={props}
          />
        );
      })}
    </Suspense>
  );
};

export default VisualizationSelector;
