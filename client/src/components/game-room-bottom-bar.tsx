import { usePlayerStore } from "@/store/usePlayerStore";
import { Send } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export function GameRoomBottomBar() {
  const [text, setText] = useState("");
  const sendMessage = usePlayerStore((state) => state.sendMessage);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <Box
      sx={{
        bottom: 0,
        left: 0,
        display: "grid",
        gridTemplateColumns: "1fr auto",
        zIndex: "90",
      }}
    >
      <TextField
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type a word here"
        autoComplete="off"
        size="small"
        variant="filled"
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
