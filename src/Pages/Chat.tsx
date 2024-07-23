import { useEffect } from "react";

export const Chat = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/chat");
    socket.addEventListener("open", (event) => {
      console.log(event);
      socket.send("Connection established! Hello!");
    });
  }, []);

  return <p>Chat</p>;
};
