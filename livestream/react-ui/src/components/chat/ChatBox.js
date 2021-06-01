import React, { useState, useEffect} from 'react';
import ChatMessage from './ChatMessage.js';

function ChatBox() {
    const [messages, setMessage] = useState([]);
    async function fetchMessages() {
        const response = await fetch("http://127.0.0.1:8000/api/chat/");
        setMessage(await response.json());
    }
    async function sendMessage() {
        const response = await fetch("http://127.0.0.1:8000/api/chat/", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "multipart/form-data; boundary=---------------------------20104240273691671416222664575",
        "Upgrade-Insecure-Requests": "1"
    },
    "referrer": "http://127.0.0.1:8000/api/chat/",
    "body": "-----------------------------20104240273691671416222664575\r\nContent-Disposition: form-data; name=\"csrfmiddlewaretoken\"\r\n\r\ncN2r89EP6a3xl4vPhOjo4KxPAwDhYfGoz2umJv5FrmI5PbOWbrQ78ls543tUAey8\r\n-----------------------------20104240273691671416222664575\r\nContent-Disposition: form-data; name=\"message\"\r\n\r\nlast message\r\n-----------------------------20104240273691671416222664575--\r\n",
    "method": "POST",
    "mode": "cors"
});
    }
    useEffect(()=>{
        fetchMessages()
    },[messages])
    return (
      <div>	
        {messages.map((messageItem, index)=>{return <ChatMessage message={messageItem} />})}
        <button onClick={async () => {await sendMessage(); console.log("hello");}}>click me to spam chat</button>
      </div>
    );
}
export default ChatBox;
