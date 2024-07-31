import { Typography, Skeleton } from "@mui/material";
import { Message } from "../utils/types";
import Markdown from "react-markdown";

const ChatBubble = ({ msg, pending }: { msg: Message; pending: boolean }) => {
  const { sender, sentAt, contents } = msg;
  const key = `${sender}${sentAt}${contents}`;
  const isBackend = sender === "MarkusAI";

  return (
    <div
      className={`rounded-xl p-4 m-2 max-w-prose shadow-md ${
        isBackend ? "bg-blue-500 text-right self-end text-white" : "bg-gray-300"
      }`}
    >
      <Typography variant="body2" className="font-bold mb-2">
        {sender}
      </Typography>
      <div>
        {pending ? (
          <Skeleton variant="rectangular" width={210} height={50} />
        ) : (
          <Typography variant="body1" key={key}>
            <Markdown>{contents}</Markdown>
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
