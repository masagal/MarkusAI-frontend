import { useEffect, useState } from "react";
import { Message } from "../utils/types";

const useWebSocketChat = (defaultMessages: Message[]) => {
  const [socket, setSocket] = useState<WebSocket>();
  const [connectionEstablished, setConnectionEstablished] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [pendingMessage, setPendingMessage] = useState<boolean>(false);

  useEffect(() => {
    const websocketUrl = import.meta.env.VITE_BACKEND_SOCKET_URL;
    const socket = new WebSocket(websocketUrl);

    socket.addEventListener("open", () => {
      setConnectionEstablished(true);
      setSocket(socket);
    });

    socket.addEventListener("message", (message) => {
      const msg: Message = {
        sender: "MarkusAI",
        sentAt: String(Date.now()),
        contents: message.data,
      };
      setPendingMessage(false);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (msgContent: string) => {
    if (socket && connectionEstablished) {
      const msg: Message = {
        sender: "you",
        sentAt: String(Date.now()),
        contents: msgContent,
      };
      setMessages((prevMessages) => [...prevMessages, msg]);
      setPendingMessage(true);
      socket.send(msgContent);
    }
  };

  return { messages, pendingMessage, connectionEstablished, sendMessage };
};

export default useWebSocketChat;
