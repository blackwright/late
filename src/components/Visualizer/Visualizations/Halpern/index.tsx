import React from 'react';
import { BufferGeometry, BufferAttribute } from 'three';
import * as VisualizationHOC from '../VisualizationHOC';
import sceneManager from './three/sceneManager';
import './Halpern.scss';

const RIPPLE_SPEED = 5;
const VERTEX_SEGMENT_WEIGHT_COEFFICIENT = 0.1;
const BASELINE_VERTEX_SCALAR_FACTOR = 1;

class Halpern extends React.Component<VisualizationHOC.WrappedProps> {
  private rendererContainer?: HTMLDivElement;
  private originalVertices?: ArrayLike<number>;
  private focusedDataIndex?: number;
  private sphereDataSegments?: number;
  private vertexSegmentLength?: number;
  private getHalpernGeometry?: () => BufferGeometry;
  private onUnmount?: () => void;

  private focusedData: number[] = [];
  private rendererRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    this.rendererContainer = this.rendererRef.current!;

    const {
      animate,
      stop,
      getSphereGeometry,
      getHalpernGeometry
    } = sceneManager(this.rendererContainer);

    const { data } = this.props;

    this.onUnmount = stop;

    this.sphereDataSegments = Math.floor(
      data.length / getSphereGeometry().parameters.widthSegments
    );

    // split vertices up into segments belonging to slices of x cross sections,
    // first and last vertices are at top and bottom of sphere
    this.vertexSegmentLength =
      (getSphereGeometry().vertices.length - 2) /
      (getSphereGeometry().parameters.widthSegments - 1);

    this.getHalpernGeometry = getHalpernGeometry;

    this.originalVertices = (getHalpernGeometry().attributes.position
      .array as Float32Array).slice(0);

    this.focusedData = new Array(data.length).fill(128);

    this.focusedDataIndex = Math.floor(data.length / 2);

    animate();
  }

  componentDidUpdate() {
    this.updateVertices(this.props.data);
  }

  componentWillUnmount() {
    this.onUnmount && this.onUnmount();
  }

  updateVertices = (data: Uint8Array) => {
    if (this.getHalpernGeometry == null || this.originalVertices == null) {
      return;
    }

    this.focusedData.splice(0, RIPPLE_SPEED);
    this.focusedData = this.focusedData.concat(
      new Array(RIPPLE_SPEED).fill(data[this.focusedDataIndex!])
    );

    const halpernBufferPositions = this.getHalpernGeometry().getAttribute(
      'position'
    ).array as Float32Array;

    let i = 0;
    while (i < this.originalVertices.length) {
      // find which segment the current index belongs to
      const vertexSegmentIndex = Math.ceil(
        Math.floor(i / 3) / this.vertexSegmentLength!
      );

      const dataIndex = vertexSegmentIndex * this.sphereDataSegments!;
      const vertexSegmentWeight = Math.min(
        vertexSegmentIndex,
        this.vertexSegmentLength! - vertexSegmentIndex
      );

      const dataVariation = Math.abs(this.focusedData[dataIndex] - 128) / 255;

      const scalar =
        dataVariation *
          vertexSegmentWeight *
          VERTEX_SEGMENT_WEIGHT_COEFFICIENT +
        BASELINE_VERTEX_SCALAR_FACTOR;

      // update X, Y, and Z vector positions in BufferGeometry
      halpernBufferPositions[i] = this.originalVertices[i] * scalar;
      halpernBufferPositions[i + 1] = this.originalVertices[i + 1] * scalar;
      halpernBufferPositions[i + 2] = this.originalVertices[i + 2] * scalar;

      i += 3;
    }

    // inform three.js that vertices should be repositioned,
    // final render is handled in sceneManager animate loop
    (this.getHalpernGeometry().getAttribute(
      'position'
    ) as BufferAttribute).needsUpdate = true;
  };

  render() {
    return (
      <div
        className="visualization halpern"
        ref={this.rendererRef}
        style={this.props.style}
      />
    );
  }
}

export default VisualizationHOC.wrap(Halpern);
