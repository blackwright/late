import React, { useState, useEffect, useRef } from 'react';
import VisualizationSelector from '../Visualizer/VisualizationSelector';
import { FFT_SIZE } from '../../config';

type Props = {
  context: AudioContext;
  source: MediaElementAudioSourceNode;
};

const Analyser: React.FC<Props> = ({ context, source }) => {
  const [rawData, setRawData] = useState(new Uint8Array());
  const [lowPassData, setLowPassData] = useState(new Uint8Array());

  const animationFrameIdRef = useRef<number>();

  useEffect(() => {
    const rawAnalyser = context.createAnalyser();
    rawAnalyser.fftSize = FFT_SIZE;
    rawAnalyser.smoothingTimeConstant = 0;
    source.connect(rawAnalyser);
    rawAnalyser.connect(context.destination);

    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    const lowPassAnalyser = context.createAnalyser();
    lowPassAnalyser.fftSize = FFT_SIZE;
    lowPassAnalyser.smoothingTimeConstant = 0;
    source.connect(filter);
    filter.connect(lowPassAnalyser);

    const tick = () => {
      const rawDataContainer = new Uint8Array(FFT_SIZE);
      rawAnalyser.getByteTimeDomainData(rawDataContainer);
      setRawData(rawDataContainer);

      const lowPassDataContainer = new Uint8Array(FFT_SIZE);
      lowPassAnalyser.getByteTimeDomainData(lowPassDataContainer);
      setLowPassData(lowPassDataContainer);

      animationFrameIdRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      animationFrameIdRef.current != null &&
        window.cancelAnimationFrame(animationFrameIdRef.current);
      rawAnalyser && rawAnalyser.disconnect();
      lowPassAnalyser && lowPassAnalyser.disconnect();
      source && source.disconnect();
    };
  }, [context, source]);

  return <VisualizationSelector data={rawData} lowPassData={lowPassData} />;
};

export default Analyser;
