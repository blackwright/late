import React from 'react';
import { Vector3 } from 'three';
import * as Visualization from '../Visualization';
import sceneManager from './three/sceneManager';

class Halpern extends React.Component<Visualization.WrappedProps> {
  rendererContainer?: HTMLDivElement;
  currentAnimationFrameId?: number;
  onUnmount?: () => void;
  getVertices?: () => Vector3[];

  private rendererRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    this.rendererContainer = this.rendererRef.current!;
    const { animate, stop, getVertices } = sceneManager(this.rendererContainer);
    this.onUnmount = stop;
    this.getVertices = getVertices;
    animate();
  }

  componentDidUpdate() {
    this.getVertices && this.updateVertices(this.props.data);
  }

  componentWillUnmount() {
    this.onUnmount && this.onUnmount();
  }

  updateVertices = (data: Uint8Array) => {
    // TODO: update mesh geometry vertices here
  };

  render() {
    return <div className="visualization halpern" ref={this.rendererRef} style={this.props.style} />;
  }
}

export default Visualization.wrap(Halpern);
