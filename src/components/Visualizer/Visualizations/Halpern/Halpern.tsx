import React from 'react';
import {
  Vector3,
  SphereGeometry,
  BufferGeometry,
  BufferAttribute
} from 'three';
import * as VisualizationHOC from '../VisualizationHOC';
import sceneManager from './three/sceneManager';
import cloneDeep from 'lodash.clonedeep';
import './Halpern.scss';

const RIPPLE_SPEED = 12;
const FOCUSED_DATA_INDEX = 512;
const VERTEX_SEGMENT_WEIGHT_COEFFICIENT = 0.1;
const BASELINE_VERTEX_SCALAR_FACTOR = 1;

class Halpern extends React.Component<VisualizationHOC.WrappedProps> {
  private rendererContainer?: HTMLDivElement;
  private originalVertices?: Vector3[];
  private getSphereGeometry?: () => SphereGeometry;
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
    this.onUnmount = stop;
    this.getSphereGeometry = getSphereGeometry;
    this.getHalpernGeometry = getHalpernGeometry;
    this.originalVertices = cloneDeep(getSphereGeometry().vertices);
    this.focusedData = new Array(this.props.data.length).fill(128);
    animate();
  }

  componentDidUpdate() {
    this.updateVertices(this.props.data);
  }

  componentWillUnmount() {
    this.onUnmount && this.onUnmount();
  }

  updateVertices = (data: Uint8Array) => {
    if (
      this.getSphereGeometry == null ||
      this.getHalpernGeometry == null ||
      this.originalVertices == null
    ) {
      return;
    }

    this.focusedData.splice(0, RIPPLE_SPEED);
    this.focusedData = this.focusedData.concat(
      new Array(RIPPLE_SPEED).fill(data[FOCUSED_DATA_INDEX])
    );

    const geometry = this.getSphereGeometry();
    const dataSegments = Math.floor(
      data.length / geometry.parameters.widthSegments
    );

    // split vertices up into segments belonging to slices of x cross sections,
    // first and last vertices are at top and bottom of sphere
    const vertexSegmentLength =
      (geometry.vertices.length - 2) / (geometry.parameters.widthSegments - 1);

    geometry.vertices.forEach((vertex, i) => {
      // find which segment the current index belongs to
      const vertexSegmentIndex = Math.ceil(i / vertexSegmentLength);

      const dataIndex = vertexSegmentIndex * dataSegments;
      const vertexSegmentWeight = Math.min(
        vertexSegmentIndex,
        vertexSegmentLength - vertexSegmentIndex
      );

      // multiplyScalar mutates so we must restore starting position
      vertex.copy(this.originalVertices![i]);
      const dataVariation = Math.abs(this.focusedData[dataIndex] - 128) / 255;

      const multiplyScalarValue =
        dataVariation *
          vertexSegmentWeight *
          VERTEX_SEGMENT_WEIGHT_COEFFICIENT +
        BASELINE_VERTEX_SCALAR_FACTOR;

      vertex.multiplyScalar(multiplyScalarValue);
    });

    const pointGeometry = this.getHalpernGeometry();
    pointGeometry.fromGeometry(geometry);

    // inform three.js that vertices should be repositioned,
    // final render is handled in sceneManager animate loop
    (pointGeometry.attributes.position as BufferAttribute).needsUpdate = true;
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
