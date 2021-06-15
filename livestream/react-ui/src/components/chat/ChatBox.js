import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage.js";
import "./ChatBox.css";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:9000";
const socket = socketIOClient(ENDPOINT);

function ChatBox() {
  const [messages, setMessage] = useState([]);
  async function fetchMessages() {
    const response = await fetch("http://127.0.0.1:8000/api/chat/");
    setMessage(await response.json());
  }
  async function sendMessage(message) {
    socket.emit("sentMessage");
  }
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("username", socket.id);
    });
    socket.on("fetchMessage", async () => {
      await fetchMessages();
      console.log("IT WORKS");
    });
  }, []);
  return (
    <div class="chatBox" id="chatBox">
      {messages.map((messageItem, index) => {
        return <ChatMessage message={messageItem} />;
      })}
      <input value="hello" />
      <button
        onClick={async () => {
          await sendMessage("hello");
        }}
      >
        send
      </button>
    </div>
  );
}
export default ChatBox;
