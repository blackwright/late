import React, { useEffect, useRef } from 'react';
import { BufferGeometry, BufferAttribute } from 'three';
import * as VisualizationHOC from '../VisualizationHOC';
import sceneManager from './three/sceneManager';
import './Halpern.scss';

const RIPPLE_SPEED = 5;
const VERTEX_SEGMENT_WEIGHT_COEFFICIENT = 0.1;
const BASELINE_VERTEX_SCALAR_FACTOR = 1;

const Halpern: React.FunctionComponent<VisualizationHOC.WrappedProps> = ({
  data,
  style
}) => {
  const rendererRef = useRef<HTMLDivElement>(null);
  const sphereDataSegmentsRef = useRef<number>();
  const originalVerticesRef = useRef<ArrayLike<number>>();
  const focusedDataIndexRef = useRef<number>(Math.floor(data.length / 2));
  const vertexSegmentLengthRef = useRef<number>();
  const getHalpernGeometryRef = useRef<() => BufferGeometry>();
  const focusedDataRef = useRef<number[]>(new Array(data.length).fill(128));

  useEffect(() => {
    const rendererContainer = rendererRef.current!;
    const {
      animate,
      stop,
      getSphereGeometry,
      getHalpernGeometry
    } = sceneManager(rendererContainer);

    sphereDataSegmentsRef.current = Math.floor(
      data.length / getSphereGeometry().parameters.widthSegments
    );

    // split vertices up into segments belonging to slices of x cross sections,
    // first and last vertices are at top and bottom of sphere
    vertexSegmentLengthRef.current =
      (getSphereGeometry().vertices.length - 2) /
      (getSphereGeometry().parameters.widthSegments - 1);

    getHalpernGeometryRef.current = getHalpernGeometry;

    originalVerticesRef.current = (getHalpernGeometry().attributes.position
      .array as Float32Array).slice(0);

    animate();

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    focusedDataRef.current.splice(0, RIPPLE_SPEED);
    focusedDataRef.current = focusedDataRef.current.concat(
      new Array(RIPPLE_SPEED).fill(data[focusedDataIndexRef.current!])
    );

    const halpernBufferPositions = getHalpernGeometryRef.current!().getAttribute(
      'position'
    ).array as Float32Array;

    let i = 0;
    while (i < originalVerticesRef.current!.length) {
      // find which segment the current index belongs to
      const vertexSegmentIndex = Math.ceil(
        Math.floor(i / 3) / vertexSegmentLengthRef.current!
      );

      const dataIndex = vertexSegmentIndex * sphereDataSegmentsRef.current!;
      const vertexSegmentWeight = Math.min(
        vertexSegmentIndex,
        vertexSegmentLengthRef.current! - vertexSegmentIndex
      );

      const dataVariation =
        Math.abs(focusedDataRef.current[dataIndex] - 128) / 255;

      const scalar =
        dataVariation *
          vertexSegmentWeight *
          VERTEX_SEGMENT_WEIGHT_COEFFICIENT +
        BASELINE_VERTEX_SCALAR_FACTOR;

      // update X, Y, and Z vector positions in BufferGeometry
      halpernBufferPositions[i] = originalVerticesRef.current![i] * scalar;
      halpernBufferPositions[i + 1] =
        originalVerticesRef.current![i + 1] * scalar;
      halpernBufferPositions[i + 2] =
        originalVerticesRef.current![i + 2] * scalar;

      i += 3;
    }

    // inform three.js that vertices should be repositioned,
    // final render is handled in sceneManager animate loop
    (getHalpernGeometryRef.current!().getAttribute(
      'position'
    ) as BufferAttribute).needsUpdate = true;
  }, [data]);

  return (
    <div className="visualization halpern" ref={rendererRef} style={style} />
  );
};

export default VisualizationHOC.wrap(Halpern);
