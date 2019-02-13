import React, { Component } from 'react';
import AudioAnalyser from './components/AudioAnalyser';

type State = {
  audioNode: HTMLAudioElement | null;
}

type Props = {};

export default class App extends Component<Props, State>  {

  state = { audioNode: null };

  audioElement: React.RefObject<HTMLAudioElement> = React.createRef();

  componentDidMount() {
    this.setState({ audioNode: this.audioElement.current });
  }

  render() {
    const { audioNode } = this.state;

    return (
      <>
        <audio
          ref={this.audioElement}
          controls
          autoPlay
        >
          <source
            src="/media/lackluster-so_youre_still_waiting.mp3"
            type="audio/mp3"
          />
        </audio>
        {audioNode ? <AudioAnalyser audioNode={audioNode} /> : null }
      </>
    );
  }
}
