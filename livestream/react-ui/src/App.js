import './App.css';
import './video-js.css';
import VideoPlayer from './components/VideoPlayer.js';
import isStreamOnline from './api/isStreamOnline.js';


function App() {
    console.log(isStreamOnline());
    const test = isStreamOnline() ? "Streamer is online !" : "Stream is offline..";
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      sources: [{
          src: 'https://stream.porus.dev/hls/show.m3u8',
        type: 'application/x-mpegURL'
      }]
    }
  return (
    <div className="App">
    <h1>{test}</h1>
    <VideoPlayer { ...videoJsOptions } />
    </div>
  );
}

export default App;
