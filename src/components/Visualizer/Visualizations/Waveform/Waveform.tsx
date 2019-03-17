import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Canvas from './Canvas';
import * as Visualization from '../Visualization';
import './Waveform.scss';

// we are always generating a new canvas for each
// data and then throwing it out, so this id exists
// very ephemerally
let id = 0;

const Waveform: React.FunctionComponent<Visualization.WrappedProps> = ({ data, style }) => {
  id += 1;

  if (id > 99) {
    id = 0;
  }

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
};

export default Visualization.wrap(Waveform);
