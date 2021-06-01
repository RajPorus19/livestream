function ChatMessage({message}) {
    return (
      <div>	
        <p>Message from {message.sender} sent at {message.sentTime}: {message.message} </p>
      </div>
    );
}
export default ChatMessage;
