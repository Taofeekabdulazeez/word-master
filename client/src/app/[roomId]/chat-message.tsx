import { Message } from "@/types";
import { Avatar, Box } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>
        {message.sender.slice(0, 1)}
      </Avatar>
      <Box
        sx={{
          borderRadius: "13px",
          display: "inline",
          width: "fit-content",
          px: "12px",
          py: "6px",
        }}
        bgcolor={blue[500]}
      >
        {message.text}
      </Box>
    </Box>
  );
}
