import "./ChatMessage.css";
function ChatMessage({ message }) {
  var formatedTime = message.sentTime.slice(
    message.sentTime.indexOf("T") + 1,
    message.sentTime.indexOf(".")
  );
  return (
    <div class="chatMessage">
      <p>{formatedTime}</p>
      <p>{message.sender}</p>
      <p>:</p>
      <p class="msg">{message.message}</p>
    </div>
  );
}
export default ChatMessage;
