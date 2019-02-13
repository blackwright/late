import React, { Component } from 'react';
import Analyser from './components/Analyser';

type Props = {};

type State = {
  audioElement: HTMLAudioElement | null;
};

export default class App extends Component<Props, State> {

  state = { audioElement: null };

  audioRef: React.RefObject<HTMLAudioElement> = React.createRef();

  componentDidMount() {
    this.setState({ audioElement: this.audioRef.current });
  }

  render() {
    const { audioElement } = this.state;

    return (
      <>
        <audio
          ref={this.audioRef}
          controls
        >
          <source
            src="/media/lackluster-so_youre_still_waiting.mp3"
            type="audio/mp3"
          />
        </audio>
        {audioElement ? <Analyser audioElement={audioElement} /> : null }
      </>
    );
  }
}
