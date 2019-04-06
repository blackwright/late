import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as VisualizationHOC from './Visualizations/VisualizationHOC';
import visualizations, {
  isMobileDevice,
  MobileDisabled
} from './Visualizations';
import { modulo } from '../../utils';
import * as Actions from '../../../src/store/actions';
import { StoreState } from '../../../src/store/types';

export const TRANSITION_ANIMATION_LENGTH = 500;

type Props = {
  data: Uint8Array;
};

type DynamicChildProps = VisualizationHOC.Props & { classNames: string };

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

  const index = modulo(currentIndex, visualizations.length);
  const intendedVisualization = visualizations[index];

  const selectedVisualization =
    intendedVisualization.options &&
    intendedVisualization.options.mobileDisabled &&
    isMobileDevice
      ? MobileDisabled
      : intendedVisualization;

  return (
    <TransitionGroup
      component={null}
      childFactory={dynamicChildFactory(classNameRoot)}
    >
      <CSSTransition
        key={index}
        timeout={TRANSITION_ANIMATION_LENGTH}
        classNames={classNameRoot || ''}
        onExit={startTransition}
        onExited={endTransition}
        mountOnEnter
        unmountOnExit
      >
        <selectedVisualization.component
          data={data}
          isTransitioning={isTransitioning}
          timeout={TRANSITION_ANIMATION_LENGTH}
          options={selectedVisualization.options}
        />
      </CSSTransition>
    </TransitionGroup>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationSelector);
