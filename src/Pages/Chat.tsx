import { useForm } from "@tanstack/react-form";
import { Typography, Button, TextField, Stack } from "@mui/material";
import ChatBubble from "../Components/ChatBubble";
import useWebSocketChat from "../ApiQueries/useWebSocketChat";
import { Message } from "../utils/types";

const developmentChats: Message[] = [
  {
    sender: "MarkusAI",
    sentAt: "0",
    contents: "Hey! Hope you are well. Let me know if you need any new whiteboard markers.",
  },
];

export const Chat = () => {
  const { messages, pendingMessage, connectionEstablished, sendMessage } = useWebSocketChat(developmentChats);

  const form = useForm({
    defaultValues: { chatInput: "" },
    onSubmit: async ({ value }) => {
      sendMessage(value.chatInput);
      form.reset();
    },
  });

  return (
    <div className="max-w-5xl flex flex-col max-h-fit">
      <Typography variant="h3" className="mb-8 text-slate-600">
        Chat
      </Typography>
      <div className="basis-3/6 flex flex-col w-full overflow-scroll grow">
        {messages.map((message, index) => (
          <ChatBubble key={index} msg={message} pending={false} />
        ))}
        {pendingMessage && (
          <ChatBubble msg={{ sender: "MarkusAI", sentAt: "0", contents: "" }} pending={true} />
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
              <Button className="grow" type="submit" variant="contained">
                Send
              </Button>
            </Stack>
          </form>
        ) : (
          <p>Loading . . .</p>
        )}
      </div>
    </div>
  );
};
