import React from 'react';
import classNames from 'classnames';
import * as Visualization from '../Visualization';
import './Drummer.scss';

const NUM_DRUMMERS = 8;
const MIN_HIT_COUNT = 40;

class Drummer extends React.Component<Visualization.WrappedProps> {
  state = { maxSize: 0 };

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const { innerWidth, innerHeight } = window;
    const maxSideLength = Math.min(innerWidth, innerHeight) - 50;
    this.setState({ maxSize: maxSideLength });
  };

  render() {
    const { data } = this.props;
    const { maxSize } = this.state;

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
        if (freqData <= ceiling) {
          freqMap[freqKey] += 1;
          break;
        }
        freqKey += 1;
      }
    });

    const drummers = Object.entries(freqMap).map(([freqKey, hitCount]) => {
      const size = ((1 + +freqKey) * maxSize) / NUM_DRUMMERS;

      return (
        <div
          key={freqKey}
          className="drummer-container"
          style={{
            width: `${size}px`,
            height: `${size}px`
          }}
        >
          <div className={classNames('beat', { hit: hitCount > MIN_HIT_COUNT })} />
        </div>
      );
    });

    return (
      <div className="visualization drummer" style={this.props.style}>
        {drummers}
      </div>
    );
  }
}

export default Visualization.wrap(Drummer);
