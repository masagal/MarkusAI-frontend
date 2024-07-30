import { useForm } from "@tanstack/react-form";
import { Typography, Button, TextField, Stack } from "@mui/material";
import ChatBubble from "../Components/ChatBubble";
import useWebSocketChat from "../ApiQueries/useWebSocketChat";
import { Message } from "../utils/types";
import { SkeletonLoading } from "../Components/SkeletonLoading";

const developmentChats: Message[] = [
  {
    sender: "MarkusAI",
    sentAt: "0",
    contents:
      "Hey! Hope you are well. Let me know if you need any new whiteboard markers.",
  },
];

export const Chat = () => {
  const { messages, pendingMessage, connectionEstablished, sendMessage } =
    useWebSocketChat(developmentChats);

  const form = useForm({
    defaultValues: { chatInput: "" },
    onSubmit: async ({ value }) => {
      sendMessage(value.chatInput);
      form.reset();
    },
  });

  if (!connectionEstablished) {
    return (
      <>
        <Typography variant="h3" className="mb-8 text-slate-600">
          Chat
        </Typography>
        <SkeletonLoading />
      </>
    );
  }

  return (
    <div className="max-w-5xl flex flex-col max-h-fit p-4">
      <Typography variant="h3" className="mb-8 text-slate-600">
        Chat
      </Typography>
      <div className="flex flex-col w-full overflow-scroll grow p-4 bg-gray-100 rounded">
        {messages.map((message, index) => (
          <ChatBubble key={index} msg={message} pending={false} />
        ))}
        {pendingMessage && (
          <ChatBubble
            msg={{ sender: "MarkusAI", sentAt: "0", contents: "" }}
            pending={true}
          />
        )}
      </div>
      <div className="mt-4">
        {connectionEstablished ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit().then(() => form.reset());
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              className="w-full p-4 bg-white rounded shadow-md"
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
                      variant="outlined"
                      placeholder="Type your message..."
                    />
                  )}
                />
              </div>
              <Button
                className="self-end"
                type="submit"
                variant="contained"
                color="primary"
              >
                Send
              </Button>
            </Stack>
          </form>
        ) : (
          <Typography variant="body1">Loading . . .</Typography>
        )}
      </div>
    </div>
  );
};
