import React from 'react';
import classNames from 'classnames';
import * as Visualization from '../Visualization';
import './Drummer.scss';
import { getRandomColor } from '../../../../utils/colors';

const NUM_DRUMMERS = 20;
const MIN_HIT_COUNT = 40;
const MIN_FREQUENCY_VARIATION = 10;
const COLOR_CHANGE_THRESHOLD = 0.5;
const MIN_DELAY_BETWEEN_COLOR_CHANGE = 200;

class Drummer extends React.Component<Visualization.WrappedProps> {
  state = { size: 0 };

  color = getRandomColor();
  lastColorChangeTimestamp = Date.now();

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const { innerWidth, innerHeight } = window;
    const maxSideLength = Math.max(innerWidth, innerHeight);
    this.setState({ size: maxSideLength * 2 });
  };

  render() {
    const { data, isTransitioning } = this.props;
    const { size } = this.state;

    const freqMap: { [key: string]: number } = {};
    const numPerSlice = 256 / NUM_DRUMMERS;

    let freqKey = 0;
    while (freqKey < NUM_DRUMMERS) {
      freqMap[freqKey] = 0;
      freqKey += 1;
    }

    data.forEach(freqData => {
      let freqKey = 0;
      while (freqKey < NUM_DRUMMERS) {
        const ceiling = numPerSlice * (freqKey + 1);
        if (Math.abs(freqData - 128) > MIN_FREQUENCY_VARIATION && freqData <= ceiling) {
          freqMap[freqKey] += 1;
          break;
        }
        freqKey += 1;
      }
    });

    // determine if we should change the background color by
    // comparing total drummer hits against a minimum threshold
    const totalHits = Object.values(freqMap).reduce((acc, hitCount) => {
      return hitCount > MIN_HIT_COUNT ? acc + 1 : acc;
    }, 0);

    // space out background color changes so they're not jarring
    const now = Date.now();
    if (
      !isTransitioning &&
      totalHits / NUM_DRUMMERS > COLOR_CHANGE_THRESHOLD &&
      now - this.lastColorChangeTimestamp > MIN_DELAY_BETWEEN_COLOR_CHANGE
    ) {
      let newColor;
      do {
        newColor = getRandomColor();
      } while (this.color === newColor);

      this.color = newColor;
      this.lastColorChangeTimestamp = now;
    }

    const drummers = Object.entries(freqMap).map(([freqKey, hitCount], i) => {
      const drummerContainerSize = ((1 + +freqKey) * size) / NUM_DRUMMERS;

      return (
        <div
          key={freqKey}
          className="drummer-container"
          style={{
            width: `${drummerContainerSize}px`,
            height: `${drummerContainerSize}px`,
            opacity: ((NUM_DRUMMERS - i) / NUM_DRUMMERS) * 0.5 * 0.25
          }}
        >
          <div className={classNames('beat', { hit: hitCount > MIN_HIT_COUNT })} />
        </div>
      );
    });

    return (
      <div className="visualization drummer" style={this.props.style}>
        {drummers}
        <div className="overlay" style={{ backgroundColor: this.color }} />
      </div>
    );
  }
}

export default Visualization.wrap(Drummer);
