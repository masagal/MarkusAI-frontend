import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button, TextField } from "@mui/material";
import ChatBubble from "../Components/ChatBubble";

import { Message } from "../utils/types";

const websocketUrl = import.meta.env.VITE_BACKEND_SOCKET_URL;

const developmentChats: Messsage[] = [
  {
    sender: "dev",
    sentAt: 0,
    contents: "lorem ipsum dolor sit amet, contescepting elit",
  },
  {
    sender: "backend",
    sentAt: 0,
    contents: "I'm sorry Dave, I can't do that.",
  },
];

export const Chat = () => {
  const [socket, setSocket] = useState<WebSocket>();
  const [connectionEstablished, setConnectionEstablished] =
    useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(developmentChats);
  const [mostRecentMessage, setMostRecentMessage] = useState<Message>();
  const [pendingMessage, setPendingMessage] = useState<boolean>(false);

  const addMessage = (msg) => {
    setMessages(messages.concat([msg]));
  };

  if (mostRecentMessage && messages[messages.length - 1] != mostRecentMessage) {
    addMessage(mostRecentMessage);
  }

  useEffect(() => {
    const socket = new WebSocket(websocketUrl);
    socket.addEventListener("open", (event) => {
      console.log(event);
      setConnectionEstablished(true);
      setSocket(socket);
    });

    socket.addEventListener("message", (message) => {
      console.log("got ", message);
      const msg = {
        sender: "the backend",
        sentAt: String(Date.now()),
        contents: message.data,
      };
      setPendingMessage(false);
      setMostRecentMessage(msg);
    });
  }, []);

  const form = useForm({
    defaultValues: { chatInput: "" },
    onSubmit: async ({ value }) => {
      console.log(value);
      socket?.send(value.chatInput);
      const msg = {
        sender: "you",
        sentAt: String(Date.now()),
        contents: value.chatInput,
      };
      setPendingMessage(true);
      setMostRecentMessage(msg);
    },
  });

  return (
    <>
      <p>Chat</p>
      <div>
        <div className="flex flex-col w-full">
          {messages.map((message) => (
            <ChatBubble msg={message} pending={false} />
          ))}
          {pendingMessage && (
            <ChatBubble
              msg={{ sender: "backend", sentAt: 0, contents: "" }}
              pending={true}
            />
          )}
        </div>
        {connectionEstablished ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit().then(() => form.reset());
            }}
          >
            <>
              <form.Field
                name="chatInput"
                children={(field) => (
                  <TextField
                    type="text"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </>
            <Button type="submit" variant="contained">
              Send
            </Button>
          </form>
        ) : (
          <p>loading . . .</p>
        )}
      </div>
    </>
  );
};
