import React from 'react';
import * as Visualization from '../Visualization';
import { camera, controls } from './entities/camera';
import scene from './entities/scene';
import renderer from './entities/renderer';

export default class Halpern extends Visualization.Component {
  rendererRef: React.RefObject<HTMLDivElement> = React.createRef();
  currentAnimationFrameId?: number;

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    const rendererContainer = this.rendererRef.current!;
    rendererContainer.appendChild(renderer.domElement);

    this.animate();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    this.currentAnimationFrameId != null && window.cancelAnimationFrame(this.currentAnimationFrameId);
  }

  onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  animate = () => {
    this.currentAnimationFrameId = window.requestAnimationFrame(this.animate);
    controls.update();
    renderer.render(scene, camera);
  };

  render() {
    return <div ref={this.rendererRef} />;
  }
}
