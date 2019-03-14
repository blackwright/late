import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as Visualization from './Visualizations/Visualization';
import Visualizations from './Visualizations/index';

type DynamicChildProps = Visualization.Props & { classNames: string };

const dynamicChildFactory = (classNames?: string) => (child: React.ReactElement<DynamicChildProps>) =>
  React.cloneElement(child, { classNames });

type Props = {
  data: Uint8Array;
};

type State = {
  prevIndex: number | null;
  currentIndex: number;
  isTransitioning: boolean;
};

export default class VisualizationSelector extends React.Component<Props, State> {
  state = {
    prevIndex: null,
    currentIndex: 0,
    isTransitioning: false
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event: KeyboardEvent) => {
    switch (event.which) {
      case 37:
      case 38: {
        this.goToPrevVisualization();
        break;
      }
      case 39:
      case 40: {
        this.goToNextVisualization();
        break;
      }
    }
  };

  goToPrevVisualization = () => {
    if (!this.state.isTransitioning) {
      this.setState(prevState => ({
        prevIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex - 1
      }));
    }
  };

  goToNextVisualization = () => {
    if (!this.state.isTransitioning) {
      this.setState(prevState => ({
        prevIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1
      }));
    }
  };

  startTransition = () => this.setState({ isTransitioning: true });

  endTransition = () => this.setState({ isTransitioning: false });

  render() {
    const { data } = this.props;
    const { prevIndex, currentIndex } = this.state;

    const transitionClassName = prevIndex != null && prevIndex < currentIndex ? 'next' : 'prev';
    const classNameRoot = transitionClassName ? `visualization-${transitionClassName}` : undefined;

    const visualizationIndex = Math.abs(currentIndex % Visualizations.length);
    const VisualizationComponent = Visualizations[visualizationIndex];

    return (
      <TransitionGroup component={null} childFactory={dynamicChildFactory(classNameRoot)}>
        <CSSTransition
          key={visualizationIndex}
          timeout={500}
          classNames={classNameRoot || ''}
          onEnter={this.startTransition}
          onEntered={this.endTransition}
          mountOnEnter
          unmountOnExit
        >
          <VisualizationComponent data={data} />
        </CSSTransition>
      </TransitionGroup>
    );
  }
}