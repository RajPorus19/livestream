import './App.css';
import './video-js.css';
import VideoPlayer from './components/VideoPlayer.js';
import ChatBox from './components/chat/ChatBox.js';


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
    <ChatBox />
    </div>
  );
}

export default App;
