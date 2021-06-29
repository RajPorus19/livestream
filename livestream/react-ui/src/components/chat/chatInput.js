import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:9000";
const socket = socketIOClient(ENDPOINT);

function ChatInput() {
  const [myMessage, setMyMessage] = useState("");
  function handleMyMessage(event) {
    setMyMessage(event.target.value);
  }
  async function sendMessage(message) {
    postMessageToAPI(message);
    socket.emit("sentMessage");
  }
  async function postMessageToAPI(message) {
    const rawResponse = await fetch("http://127.0.0.1:8000/api/chat/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify({
        message: message,
      }),
    });
    console.log("hi");
    console.log(localStorage.getItem("access"));
  }
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     socket.emit("username", socket.id);
  //     fetchMessages();
  //   });
  //   socket.on("fetchMessage", async () => {
  //     await fetchMessages();
  //   });
  // }, []);
  return (
    <div class="chatInput" id="chatInput">
      <input type="text" name="myMessage" onChange={handleMyMessage} />
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
export default ChatInput;
