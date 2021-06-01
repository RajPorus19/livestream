import React, { useState, useEffect} from 'react';

function Chat() {
    const [messages, setMessage] = useState([]);
    async function fetchMessages() {
        const response = await fetch("http://127.0.0.1:8000/api/chat/");
        setMessage(await response.json());
    }
    useEffect(()=>{
        fetchMessages()
    },[messages])
    return (
      <div>	
        {messages.map((messageItem, index)=>{return <p>{messageItem.message}</p>})}
      </div>
    );
}
export default Chat;
