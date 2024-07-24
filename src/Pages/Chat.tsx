import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Define the type for the Message object
type Message = {
  sender: string;
  sentAt: string;
  contents: string;
};

export const Chat = () => {
  // Destructure methods from useForm for form handling
  const { register, handleSubmit, reset } = useForm();
  
  // State variables
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionEstablished, setConnectionEstablished] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [mostRecentMessage, setMostRecentMessage] = useState<Message | null>(null);

  // Function to add a new message to the messages state
  const addMessage = (msg: Message) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  // useEffect to add the most recent message to the messages state
  useEffect(() => {
    if (mostRecentMessage) {
      addMessage(mostRecentMessage);
    }
  }, [mostRecentMessage]);

  // useEffect to establish WebSocket connection and handle events
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/chat");
    
    ws.onopen = (event) => {
      console.log("WebSocket connection established:", event);
      setConnectionEstablished(true);
      setSocket(ws);
    };

    ws.onmessage = (message) => {
      console.log("Received message:", message);
      const msg = {
        sender: "the backend",
        sentAt: new Date().toISOString(),
        contents: message.data,
      };
      setMostRecentMessage(msg);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionEstablished(false);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      setConnectionEstablished(false);
    };

    // Cleanup function to close the WebSocket connection
    return () => {
      ws.close();
    };
  }, []);

  // Handle form submission
  const onSubmit = (data: { chatInput: string }) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("Sending message:", data.chatInput);
      socket.send(data.chatInput);
      const msg = {
        sender: "you",
        sentAt: new Date().toISOString(),
        contents: data.chatInput,
      };
      setMostRecentMessage(msg);
      reset();
    } else {
      console.error("WebSocket is not open. Ready state:", socket?.readyState);
    }
  };

  return (
    <>
      <p>Chat</p>
      <div>
        {/* Render the messages */}
        {messages.map((message, index) => (
          <p key={index}>
            <strong>{message.sender}</strong>: {message.contents}
          </p>
        ))}
        {/* Render the form if connection is established, otherwise show loading */}
        {connectionEstablished ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("chatInput", { required: true })} />
            <button type="submit">Send</button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
