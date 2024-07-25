import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Typography, Button, TextField, Stack } from "@mui/material";
import ChatBubble from "../Components/ChatBubble";

import { Message } from "../utils/types";

const websocketUrl = import.meta.env.VITE_BACKEND_SOCKET_URL;

const developmentChats: Messsage[] = [
  {
    sender: "MarkusAI",
    sentAt: 0,
    contents:
      "Hey! Hope you are well. Let me know if you need any new whiteboard markers.",
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
        sender: "MarkusAI",
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
      <div className="max-w-5xl flex flex-col max-h-fit">
        <Typography variant="h3" className="mb-8 text-slate-600">
          Chat
        </Typography>
        <div className="basis-3/6 flex flex-col w-full overflow-scroll grow">
          {messages.map((message) => (
            <ChatBubble msg={message} pending={false} />
          ))}
          {pendingMessage && (
            <ChatBubble
              msg={{ sender: "MarkusAI", sentAt: 0, contents: "" }}
              pending={true}
            />
          )}
        </div>
        <div className="basis-10">
          {connectionEstablished ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit().then(() => form.reset());
              }}
            >
              <Stack
                className="w-full max-w-5xl my-8 bg-white p-10 box-content"
                direction="row"
                spacing={2}
              >
                <div className="grow">
                  <form.Field
                    name="chatInput"
                    children={(field) => (
                      <TextField
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full"
                      />
                    )}
                  />
                </div>
                <Button classname="grow" type="submit" variant="contained">
                  Send
                </Button>
              </Stack>
            </form>
          ) : (
            <p>loading . . .</p>
          )}
        </div>
      </div>
    </>
  );
};
