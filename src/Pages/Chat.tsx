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
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/chat");
    socket.addEventListener("open", (event) => {
      console.log(event);
      socket.send("Connection established! Hello!");
      setConnectionEstablished(true);
      setSocket(socket);
    });
  }, []);

  const form = useForm({
    defaultValues: { chatInput: "" },
    onSubmit: async ({ value }) => {
      console.log(value);
      socket?.send(value.chatInput);
      setMessages(
        messages.concat([
          {
            sender: "you",
            sentAt: String(Date.now()),
            contents: value.chatInput,
          },
        ])
      );
    },
  });

  return (
    <>
      <p>Chat</p>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
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
      </div>
    </>
  );
};
