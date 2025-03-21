import { Container, Paper } from "@mui/material";
import { GameRoomMessage } from "./game-room-message";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import { useRef } from "react";
import { useRoomMessagesStore } from "@/store/useRoomMessagesStore";

export function GameRoomMessages() {
  const messages = useRoomMessagesStore((state) => state.messages);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  useScrollToBottom(messagesContainerRef, [messages]);

  return (
    <Paper
      ref={messagesContainerRef}
      style={{
        height: "calc(90vh - 60px)",
        overflowY: "auto",
        paddingBlock: "10px",
      }}
    >
      <Container
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.map((message, i) => {
          return <GameRoomMessage key={i} message={message} />;
        })}
      </Container>
    </Paper>
  );
}
