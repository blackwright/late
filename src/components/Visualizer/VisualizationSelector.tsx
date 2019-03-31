import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as Visualization from './Visualizations/Visualization';
import Visualizations from './Visualizations';
import { modulo } from '../../utils';
import * as Actions from '../../../src/store/actions';
import { StoreState } from '../../../src/store/types';

export const TRANSITION_ANIMATION_LENGTH = 500;

type Props = {
  data: Uint8Array;
};

type DynamicChildProps = Visualization.Props & { classNames: string };

const dynamicChildFactory = (classNames?: string) => (
  child: React.ReactElement<DynamicChildProps>
) => React.cloneElement(child, { classNames });

const mapStateToProps = (state: StoreState) => ({
  currentIndex: state.currentVisualizationIndex,
  prevIndex: state.prevVisualizationIndex,
  isTransitioning: state.isTransitioning
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startTransition: () => dispatch(Actions.beginVisualizationTransition()),
  endTransition: () => dispatch(Actions.endVisualizationTransition())
});

const VisualizationSelector: React.FunctionComponent<
  Props &
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>
> = ({
  data,
  startTransition,
  endTransition,
  isTransitioning,
  prevIndex,
  currentIndex
}) => {
  const transitionClassName =
    prevIndex != null && prevIndex < currentIndex ? 'next' : 'prev';

  const classNameRoot = transitionClassName
    ? `visualization-${transitionClassName}`
    : undefined;

  const visualizationIndex = modulo(currentIndex, Visualizations.length);

  const VisualizationComponent: React.ComponentType<Visualization.Props> =
    Visualizations[visualizationIndex];

  return (
    <TransitionGroup
      component={null}
      childFactory={dynamicChildFactory(classNameRoot)}
    >
      <CSSTransition
        key={visualizationIndex}
        timeout={TRANSITION_ANIMATION_LENGTH}
        classNames={classNameRoot || ''}
        onExit={startTransition}
        onExited={endTransition}
        mountOnEnter
        unmountOnExit
      >
        <VisualizationComponent
          data={data}
          isTransitioning={isTransitioning}
          timeout={TRANSITION_ANIMATION_LENGTH}
        />
      </CSSTransition>
    </TransitionGroup>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(VisualizationSelector);
