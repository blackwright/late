import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Visualizations from './Visualizations';
import * as Visualization from './Visualizations/Visualization';

type State = {
  visualizationIndex: number;
};

export default class Visualizer extends Component<Visualization.Props, State> {
  state = { visualizationIndex: 0 };

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
    this.setState((prevState: State) => {
      const prevIndex = prevState.visualizationIndex - 1;
      return {
        visualizationIndex: prevIndex < 0 ? Visualizations.length - 1 : prevIndex
      };
    });
  };

  goToNextVisualization = () => {
    this.setState((prevState: State) => {
      const nextIndex = prevState.visualizationIndex + 1;
      return {
        visualizationIndex: nextIndex > Visualizations.length - 1 ? 0 : nextIndex
      };
    });
  };

  render() {
    const { data } = this.props;
    const { visualizationIndex } = this.state;
    const Visualization = Visualizations[visualizationIndex];

    return (
      <TransitionGroup component={null}>
        <CSSTransition key={visualizationIndex} timeout={500} classNames="visualization">
          <Visualization data={data} />
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
