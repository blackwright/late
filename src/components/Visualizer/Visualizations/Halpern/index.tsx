import React, { useEffect, useRef } from 'react';
import { BufferGeometry, BufferAttribute } from 'three';
import * as VisualizationHOC from '../VisualizationHOC';
import sceneManager from './three/sceneManager';
import { QualitySettings } from '../index';
import './Halpern.scss';

const VERTEX_SEGMENT_WEIGHT_COEFFICIENT = 0.1;
const BASELINE_VERTEX_SCALAR_FACTOR = 1;

const QUALITY: QualitySettings = {
  0: { RIPPLE_SPEED: 2 },
  1: { RIPPLE_SPEED: 3 },
  2: { RIPPLE_SPEED: 4 }
};

const Halpern: React.FC<VisualizationHOC.WrappedProps> = ({
  data,
  quality
}) => {
  const rendererRef = useRef<HTMLDivElement>(null);
  const managedSceneRef = useRef<any>();
  const originalVerticesRef = useRef<ArrayLike<number>>();
  const sphereDataSegmentsRef = useRef<number>();
  const vertexSegmentLengthRef = useRef<number>();
  const focusedDataRef = useRef<number[]>(new Array(data.length).fill(128));

  useEffect(() => {
    const rendererContainer = rendererRef.current!;
    const managedScene = sceneManager(rendererContainer, quality);

    managedSceneRef.current = managedScene;

    const halpernGeometry = managedScene.halpern.geometry as BufferGeometry;

    sphereDataSegmentsRef.current = Math.floor(
      data.length / managedScene.sphereGeometry.parameters.widthSegments
    );

    // split vertices up into segments belonging to slices of x cross sections,
    // first and last vertices are at top and bottom of sphere
    vertexSegmentLengthRef.current =
      (managedScene.sphereGeometry.vertices.length - 2) /
      (managedScene.sphereGeometry.parameters.widthSegments - 1);

    originalVerticesRef.current = (halpernGeometry.attributes.position
      .array as Float32Array).slice(0);

    managedScene.clock.start();

    managedScene.animate();

    return managedScene.cleanup;
  }, [quality]);

  useEffect(() => {
    const rippleSpeed = QUALITY[quality].RIPPLE_SPEED;
    const focusedDataIndex = Math.floor(data.length / 2);

    focusedDataRef.current.splice(0, rippleSpeed);
    focusedDataRef.current = focusedDataRef.current.concat(
      new Array(rippleSpeed).fill(data[focusedDataIndex])
    );

    const halpernGeometry = managedSceneRef.current!.halpern.geometry;
    const halpernBufferPositions = halpernGeometry.getAttribute('position')
      .array as Float32Array;

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
    (halpernGeometry.getAttribute(
      'position'
    ) as BufferAttribute).needsUpdate = true;
  }, [data]);

  return <div className="halpern" ref={rendererRef} />;
};

export default VisualizationHOC.wrap(Halpern);
