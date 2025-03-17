import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

type ChatMessageProps = {
  message: {
    text: string;
  };
};

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <Box
      sx={{
        borderRadius: "23px",
        display: "inline-block",
        px: "12px",
        py: "6px",
      }}
      bgcolor={blue[500]}
    >
      {message.text}
    </Box>
  );
}
