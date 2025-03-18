import { Send } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

type ChatBottomProps = {
  sendMessage: (text: string) => void;
};

export function ChatBottom({ sendMessage }: ChatBottomProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        py: "30px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        width: "100%",
      }}
    >
      <TextField
        value={text}
        onChange={(event) => setText(event.target.value)}
        sx={{}}
        size="small"
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSend();
        }}
      />
      <Button
        onClick={handleSend}
        variant="contained"
        endIcon={<Send />}
      ></Button>
    </Box>
  );
}
