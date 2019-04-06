import React, { useState, useLayoutEffect, useRef } from 'react';
import VisualizationSelector from '../Visualizer/VisualizationSelector';
import { FFT_SIZE } from '../../config';

type Props = {
  context: AudioContext;
  source: MediaElementAudioSourceNode;
};

const Analyser: React.FunctionComponent<Props> = ({ context, source }) => {
  const [data, setData] = useState(new Uint8Array());

  const animationFrameIdRef = useRef<number>();

  useLayoutEffect(() => {
    const analyser = context.createAnalyser();
    analyser.fftSize = FFT_SIZE;
    analyser.smoothingTimeConstant = 0;

    source.connect(analyser);
    analyser.connect(context.destination);

    const tick = () => {
      const dataContainer = new Uint8Array(FFT_SIZE);
      analyser.getByteTimeDomainData(dataContainer);
      setData(dataContainer);
      animationFrameIdRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      animationFrameIdRef.current != null &&
        window.cancelAnimationFrame(animationFrameIdRef.current);
      analyser && analyser.disconnect();
      source && source.disconnect();
    };
  }, []);

  return <VisualizationSelector data={data} />;
};

export default Analyser;
