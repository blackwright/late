import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as Visualization from './Visualization';
import Visualizations from './index';

type DynamicChildProps = Visualization.Props & { classNames: string };

const dynamicChildFactory = (classNames: string) => (child: React.ReactElement<DynamicChildProps>) =>
  React.cloneElement(child, { classNames });

type SelectorProps = Visualization.Props & { index: number };

type SelectorState = {
  index: number;
  transition?: string;
};

export class VisualizationSelector extends React.Component<SelectorProps, SelectorState> {
  state = {
    index: 0,
    transition: 'next'
  };

  static getDerivedStateFromProps(props: SelectorProps, state: SelectorState) {
    const currentIndex = state.index;
    const nextIndex = props.index;

    if (currentIndex !== nextIndex) {
      const transition = currentIndex < nextIndex ? 'next' : 'prev';
      return {
        index: nextIndex,
        transition
      };
    }
    return null;
  }

  render() {
    const { data } = this.props;
    const { index, transition } = this.state;
    const classNames = `visualization-${transition}`;

    const visualizationIndex = Math.abs(index % Visualizations.length);
    const VisualizationComponent = Visualizations[visualizationIndex];

    return (
      <TransitionGroup component={null} childFactory={dynamicChildFactory(classNames)}>
        <CSSTransition key={visualizationIndex} timeout={1000} classNames={classNames} mountOnEnter unmountOnExit>
          <VisualizationComponent data={data} />
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
