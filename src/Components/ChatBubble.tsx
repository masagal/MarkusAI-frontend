import { Typography } from "@mui/material";
import { Message } from "../utils/types";
import { Skeleton } from "@mui/material";

const ChatBubble = ({ msg, pending }: { msg: Message; pending: boolean }) => {
  const { sender, sentAt, contents } = msg;
  const key = `${sender}${sentAt}${contents}`;
  const isBackend = sender == "MarkusAI";
  return (
    <div
      className={`rounded-xl bg-slate-400 p-1 m-1 max-w-prose ${
        isBackend && "text-right place-self-end"
      }`}
    >
      <Typography>
        <span className="text-white">{sender}</span>
        <div className="bg-slate-400 p-4">
          {pending ? (
            <Skeleton variant="rectangular" width={210} />
          ) : (
            <p key={key}>{contents}</p>
          )}
        </div>
      </Typography>
    </div>
  );
};

export default ChatBubble;