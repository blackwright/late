import React, { useState, useEffect, useRef } from 'react';
import VisualizationSelector from '../Visualizer/VisualizationSelector';
import { FFT_SIZE } from '../../config';

type Props = {
  audioContext?: AudioContext;
  audioSource?: MediaElementAudioSourceNode;
};

const Analyser: React.FC<Props> = ({ audioContext, audioSource }) => {
  const [rawData, setRawData] = useState(new Uint8Array());
  const [lowPassData, setLowPassData] = useState(new Uint8Array());

  const animationFrameIdRef = useRef<number>();

  useEffect(() => {
    if (audioContext == null || audioSource == null) {
      return;
    }

    const rawAnalyser = audioContext.createAnalyser();
    rawAnalyser.fftSize = FFT_SIZE;
    rawAnalyser.smoothingTimeConstant = 0;
    audioSource.connect(rawAnalyser);
    rawAnalyser.connect(audioContext.destination);

    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    const lowPassAnalyser = audioContext.createAnalyser();
    lowPassAnalyser.fftSize = FFT_SIZE;
    lowPassAnalyser.smoothingTimeConstant = 0;
    audioSource.connect(filter);
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
      audioSource && audioSource.disconnect();
    };
  }, [audioContext, audioSource]);

  return <VisualizationSelector data={rawData} lowPassData={lowPassData} />;
};

export default Analyser;
