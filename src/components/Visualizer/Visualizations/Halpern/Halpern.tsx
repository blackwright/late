import React from 'react';
import * as Visualization from '../Visualization';
import sceneManager from './three/sceneManager';

class Halpern extends React.Component<Visualization.WrappedProps> {
  rendererContainer?: HTMLDivElement;
  currentAnimationFrameId?: number;
  onUnmount?: () => void;

  private rendererRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    this.rendererContainer = this.rendererRef.current!;
    const { animate, stop } = sceneManager(this.rendererContainer);
    this.onUnmount = stop;
    animate();
  }

  componentWillUnmount() {
    this.onUnmount && this.onUnmount();
  }

  render() {
    return <div className="visualization halpern" ref={this.rendererRef} style={this.props.style} />;
  }
}

export default Visualization.wrap(Halpern);
