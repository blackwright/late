import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import * as VisualizationHOC from './Visualizations/VisualizationHOC';
import visualizations from './Visualizations';
import { modulo } from '../../utils';
import { StoreState } from '../../../src/store/types';

type Props = Pick<VisualizationHOC.Props, 'data' | 'lowPassData'>;

type StyledProps = Props &
  Pick<StoreState, 'quality'> & {
    style: React.CSSProperties;
  };

const mapStateToProps = (state: StoreState) => ({
  currentIndex: state.currentVisualizationIndex,
  prevIndex: state.prevVisualizationIndex,
  quality: state.quality
});

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

const VisualizationSelector: React.FC<
  Props & ReturnType<typeof mapStateToProps>
> = ({ data, lowPassData, prevIndex, currentIndex, quality }) => {
  const visIndex = modulo(currentIndex, visualizations.length);

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
    from: { transform: direction(currentIndex, prevIndex) },
    enter: { transform: direction() },
    leave: { transform: direction(prevIndex, currentIndex) },
    initial: { transform: direction(0, -1) }
  });

  return (
    <>
      {transitions.map(({ item, props, key }) => {
        const Visualization = styledVisualizations[item];
        return (
          <Visualization
            key={key}
            data={data}
            lowPassData={lowPassData}
            quality={quality}
            style={props}
          />
        );
      })}
    </>
  );
};

export default connect(mapStateToProps)(VisualizationSelector);
