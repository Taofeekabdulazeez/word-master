"use client";

import { Container, Paper, Typography } from "@mui/material";
import { ChatMessage } from "./chat-message";
import { Message, Room } from "@/types";
import { useRoomChatStore } from "@/store/useRoomChatStore";
import { useEffect, useRef } from "react";
import { useRoomMessagesStore } from "@/store/useRoomMessagesStore";

type GameChatProps = {
  room: Room;
  messages: Message[];
};

export function GameChat({ messages }: GameChatProps) {
  const socket = useRoomChatStore((state) => state.socket);
  const sendMessage = useRoomMessagesStore((state) => state.sendMessage);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    console.log(socket);
    socket?.on("round/started", (response) => sendMessage(response));

    return () => {
      socket?.off("round/started");
    };
  }, [socket, sendMessage]);

  return (
    <Paper
      ref={messagesContainerRef}
      style={{
        height: "calc(90vh - 60px)",
        overflowY: "auto",
        paddingBlock: "10px",
      }}
    >
      <Typography variant="body1" align="center" fontSize={12}>
        You joined this game room
      </Typography>
      <Container
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {messages.map((message, i) => {
          return <ChatMessage key={i} message={message} />;
        })}
      </Container>
    </Paper>
  );
}
