import React from 'react';
import * as Visualization from '../Visualization';
import { camera, controls } from './entities/camera';
import scene from './entities/scene';
import renderer from './entities/renderer';

class Halpern extends React.Component<Visualization.WrappedProps> {
  rendererContainer?: HTMLDivElement;
  currentAnimationFrameId?: number;

  private rendererRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    this.rendererContainer = this.rendererRef.current!;
    this.rendererContainer.appendChild(renderer.domElement);

    this.onResize();
    this.animate();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    this.currentAnimationFrameId != null && window.cancelAnimationFrame(this.currentAnimationFrameId);
    this.rendererContainer!.removeChild(renderer.domElement);
  }

  onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  animate = () => {
    controls.update();
    renderer.render(scene, camera);
    this.currentAnimationFrameId = window.requestAnimationFrame(this.animate);
  };

  render() {
    return <div className="visualization halpern" ref={this.rendererRef} style={this.props.style} />;
  }
}

export default Visualization.wrap(Halpern);
