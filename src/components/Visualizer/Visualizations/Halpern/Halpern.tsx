import React from 'react';
import { Vector3, SphereGeometry } from 'three';
import * as Visualization from '../Visualization';
import sceneManager from './three/sceneManager';
import cloneDeep from 'lodash.clonedeep';

const VERTEX_SEGMENT_WEIGHT_COEFFICIENT = 0.02;

class Halpern extends React.Component<Visualization.WrappedProps> {
  rendererContainer?: HTMLDivElement;
  currentAnimationFrameId?: number;
  originalVertices?: Vector3[];
  getSphereGeometry?: () => SphereGeometry;
  onUnmount?: () => void;

  private rendererRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    this.rendererContainer = this.rendererRef.current!;
    const { animate, stop, getSphereGeometry } = sceneManager(this.rendererContainer);
    this.onUnmount = stop;
    this.getSphereGeometry = getSphereGeometry;
    this.originalVertices = cloneDeep(getSphereGeometry().vertices);
    animate();
  }

  componentDidUpdate() {
    this.updateVertices(this.props.data);
  }

  componentWillUnmount() {
    this.onUnmount && this.onUnmount();
  }

  updateVertices = (data: Uint8Array) => {
    if (this.getSphereGeometry == null || this.originalVertices == null) {
      return;
    }

    const geometry = this.getSphereGeometry();
    const dataSegments = Math.floor(data.length / geometry.parameters.widthSegments);

    // split vertices up into segments belonging to slices of x cross sections,
    // first and last vertices are at top and bottom of sphere
    const vertexSegmentLength = (geometry.vertices.length - 2) / (geometry.parameters.widthSegments - 1);

    geometry.vertices.forEach((vertex, i) => {
      if (i % 2 !== 0) {
        return;
      }

      // find which segment the current index belongs to
      const vertexSegmentIndex = Math.ceil(i / vertexSegmentLength);

      if (vertexSegmentIndex % 2 === 0) {
        return;
      }

      const dataIndex = vertexSegmentIndex * dataSegments;
      const vertexSegmentWeight = Math.min(vertexSegmentIndex, vertexSegmentLength - vertexSegmentIndex);

      // multiplyScalar mutates so we must restore starting position
      vertex.copy(this.originalVertices![i]);
      vertex.multiplyScalar(1 + (data[dataIndex] / 255) * vertexSegmentWeight * VERTEX_SEGMENT_WEIGHT_COEFFICIENT);
    });

    // inform three.js that vertices should be repositioned,
    // final render is handled in sceneManager animate loop
    geometry.verticesNeedUpdate = true;
  };

  render() {
    return <div className="visualization halpern" ref={this.rendererRef} style={this.props.style} />;
  }
}

export default Visualization.wrap(Halpern);

// TODO: rotate x until camera controls are touched

// TODO: replace renderer bkg color with transparency, use CSS bkg
