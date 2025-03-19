import { Message } from "@/types";
import { Check, Close } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { blue, deepOrange, green, pink } from "@mui/material/colors";

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar
        sx={{
          bgcolor: deepOrange[500],
          width: "20px",
          height: "20px",
          textTransform: "uppercase",
        }}
      >
        {message.sender.substring(0, 2)}
      </Avatar>
      <Box
        sx={{
          borderRadius: "9px",
          display: "inline",
          width: "fit-content",
          px: "10px",
          py: "5px",
        }}
        fontSize="small"
        bgcolor={blue[500]}
      >
        {message.text}
      </Box>
      {message.isAnagram && (
        <Typography
          fontSize="small"
          sx={{ display: "flex", alignItems: "center", gap: 0.3 }}
          color={message.isGuessed ? pink[400] : green[400]}
        >
          {message.isGuessed ? (
            <Close fontSize="small" />
          ) : (
            <Check fontSize="small" />
          )}
          {message.isGuessed
            ? "This word has been guessed"
            : "You won 4 points"}
        </Typography>
      )}
    </Box>
  );
}
