import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Canvas from './Canvas';
import * as Visualization from '../Visualization';
import './Waveform.scss';

const MAX_SIMULTANEOUS_WAVEFORMS = 5;
let id = 0;

class Waveform extends React.Component<Visualization.WrappedProps> {
  // state: State = {
  //   waveforms: []
  // };

  // static getDerivedStateFromProps(props: Visualization.WrappedProps, state: State) {
  //   const { data } = props;
  //   const { waveforms } = state;

  //   const nextWaveform = {
  //     id,
  //     data
  //   };

  //   id += 1;
  //   console.log('id', id);

  //   const nextWaveforms = waveforms.concat(nextWaveform);

  //   return {
  //     waveforms: nextWaveforms.length > MAX_SIMULTANEOUS_WAVEFORMS ? nextWaveforms.slice(1) : nextWaveforms
  //   };
  // }

  render() {
    const { data, style } = this.props;

    id += 1;

    return (
      <TransitionGroup className="visualization waveform" style={style}>
        <CSSTransition
          key={id}
          timeout={{
            enter: 150,
            exit: 300
          }}
          classNames="fade"
          unmountOnExit
        >
          <Canvas key={id} data={data} />
        </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}

export default Visualization.wrap(Waveform);
