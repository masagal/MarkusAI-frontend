import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";

type Message = {
  sender: string;
  sentAt: string;
  contents: string;
};

export const Chat = () => {
  const [socket, setSocket] = useState<WebSocket>();
  const [connectionEstablished, setConnectionEstablished] =
    useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [mostRecentMessage, setMostRecentMessage] = useState<Message>();

  const addMessage = (msg) => {
    setMessages(messages.concat([msg]));
  };

  if (mostRecentMessage && messages[messages.length - 1] != mostRecentMessage) {
    addMessage(mostRecentMessage);
  }

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/chat");
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
      setMostRecentMessage(msg);
    },
  });

  return (
    <>
      <p>Chat</p>
      <div>
        {messages.map((message) => (
          <p key={`${message.sender}-${message.sentAt}-${message.contents}`}>
            <strong>{message.sender}</strong>: {message.contents}
          </p>
        ))}
        {connectionEstablished ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit().then(() => form.reset());
            }}
          >
            <form.Field
              name="chatInput"
              children={(field) => (
                <input
                  type="text"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
            <button type="submit">send</button>
          </form>
        ) : (
          <p>loading . . .</p>
        )}
      </div>
    </>
  );
};
