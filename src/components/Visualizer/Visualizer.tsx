import React, { Component } from 'react';
import { VisualizationSelector } from './Visualizations/Selector';
import * as Visualization from './Visualizations/Visualization';

type State = {
  index: number;
};

export default class Visualizer extends Component<Visualization.Props, State> {
  state = { index: 0 };

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
    this.setState(prevState => ({ index: prevState.index - 1 }));
  };

  goToNextVisualization = () => {
    this.setState(prevState => ({ index: prevState.index + 1 }));
  };

  render() {
    const { data } = this.props;
    const { index } = this.state;

    return <VisualizationSelector data={data} index={index} />;
  }
}
