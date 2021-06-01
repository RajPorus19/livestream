import './App.css';
import './video-js.css';
import VideoPlayer from './components/VideoPlayer.js';
import Chat from './components/Chat.js';


function App() {
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
    <VideoPlayer { ...videoJsOptions } />
    <Chat />
    </div>
  );
}

export default App;
