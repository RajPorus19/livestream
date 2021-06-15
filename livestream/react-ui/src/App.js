import './App.css';
import './video-js.css';
import VideoPlayer from './components/VideoPlayer.js';
import ChatBox from './components/chat/ChatBox.js';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div class="container">
            <div class="row">
                <div class="col-8">
                    <VideoPlayer { ...videoJsOptions } />
                </div>
                <div class="col-4">
                    <ChatBox />
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
