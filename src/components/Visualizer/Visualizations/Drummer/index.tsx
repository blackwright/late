import React, { useState, useRef, useLayoutEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import classNames from 'classnames';
import * as VisualizationHOC from '../VisualizationHOC';
import './Drummer.scss';
import { getRandomColor } from '../../../../utils/colors';
import { DATA_SIZE } from '../../../../config';
import { QualitySettings } from '../index';

const MIN_HIT_COUNT = 0.04;
const MIN_FREQUENCY_VARIATION = 10;
const MIN_DELAY_BETWEEN_COLOR_CHANGE = 200;

const QUALITY: QualitySettings = {
  0: { NUM_DRUMMERS: 6 },
  1: { NUM_DRUMMERS: 10 },
  2: { NUM_DRUMMERS: 16 }
};

const minHitCount = MIN_HIT_COUNT * DATA_SIZE;

const Drummer: React.FC<VisualizationHOC.WrappedProps> = ({
  data,
  isBeat,
  quality
}) => {
  const [size, setSize] = useState(0);
  const [colorSize, setColorSize] = useState(0);

  const colorsRef = useRef({
    values: [getRandomColor()],
    lastChangedTimestamp: Date.now()
  });

  useLayoutEffect(() => {
    const onResize = () => {
      const { innerWidth, innerHeight } = window;
      const maxSideLength = Math.max(innerWidth, innerHeight);
      setSize(maxSideLength * 2);

      const colorDiameter = Math.sqrt(
        Math.pow(innerWidth, 2) + Math.pow(innerHeight, 2)
      );
      setColorSize(colorDiameter);
    };

    onResize();

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const colors = colorsRef.current;
  const numDrummers = QUALITY[quality].NUM_DRUMMERS;

  const freqMap: { [key: string]: number } = {};
  const numPerSlice = 256 / numDrummers;

  let freqKey = 0;
  while (freqKey < numDrummers) {
    freqMap[freqKey] = 0;
    freqKey += 1;
  }

  data.forEach(freqData => {
    let freqKey = 0;
    while (freqKey < numDrummers) {
      const ceiling = numPerSlice * (freqKey + 1);
      if (
        Math.abs(freqData - 128) > MIN_FREQUENCY_VARIATION &&
        freqData <= ceiling
      ) {
        freqMap[freqKey] += 1;
        break;
      }
      freqKey += 1;
    }
  });

  // space out background color changes so they're not jarring
  const now = Date.now();
  if (
    isBeat &&
    now - colors.lastChangedTimestamp > MIN_DELAY_BETWEEN_COLOR_CHANGE
  ) {
    let newColor;
    do {
      newColor = getRandomColor();
    } while (colors.values[colors.values.length - 1] === newColor);

    colors.values.push(newColor);
    if (colors.values.length > 1) {
      colors.values.shift();
    }
    colors.lastChangedTimestamp = now;
  }

  const drummers = Object.entries(freqMap).map(([freqKey, hitCount], i) => {
    const drummerContainerSize = ((1 + +freqKey) * size) / numDrummers;

    return (
      <div
        key={freqKey}
        className="drummer-container"
        style={{
          width: `${drummerContainerSize}px`,
          height: `${drummerContainerSize}px`,
          opacity: ((numDrummers - i) / numDrummers) * 0.5 * 0.25
        }}
      >
        <div className={classNames('beat', { hit: hitCount > minHitCount })} />
      </div>
    );
  });

  const startingColorSize = size / (numDrummers * 2);

  const transitions = useTransition(colors.values, null, {
    from: item => ({
      backgroundColor: item,
      transform: `translate3d(0, 0, 0) scale(${startingColorSize})`
    }),
    enter: { transform: `translate3d(0, 0, 0) scale(${colorSize})` },
    leave: { transform: `translate3d(0, 0, 0) scale(0)` },
    config: config.gentle
  });

  return (
    <div className="drummer">
      {drummers}
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div className="color-overlay" key={key} style={props} />
        );
      })}
    </div>
  );
};

export default VisualizationHOC.wrap(Drummer);
