import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage.js";
import "./ChatBox.css";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:9000";
const socket = socketIOClient(ENDPOINT);

function ChatBox() {
  const [messages, setMessage] = useState([]);
  const [myMessage, setMyMessage] = useState("");
  async function fetchMessages() {
    const response = await fetch("http://127.0.0.1:8000/api/chat/");
    setMessage(await response.json());
  }
  function handleMyMessage(event) {
    //setMyMessage(event.target.value);
    console.log(event.target.value);
  }
  async function sendMessage(message) {
    socket.emit("sentMessage");
  }
  async function postMessageToAPI(message) {
    alert("doesn't work for the moment");
  }
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("username", socket.id);
      fetchMessages();
    });
    socket.on("fetchMessage", async () => {
      await fetchMessages();
    });
  }, []);
  return (
    <div class="chatBox" id="chatBox">
      {messages.map((messageItem, index) => {
        return <ChatMessage message={messageItem} />;
      })}
      <input type="text" name="myMessage" />
      <button
        onClick={async () => {
          await sendMessage(myMessage);
        }}
      >
        send
      </button>
    </div>
  );
}
export default ChatBox;
