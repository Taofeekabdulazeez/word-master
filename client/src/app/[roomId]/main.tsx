"use client";
import { Header } from "./header";
import { GameChat } from "./game-chat";
import { ChatBottom } from "./chat-bottom";
import { Box } from "@mui/material";
import { useRoomMessagesStore } from "@/store/useRoomMessagesStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Room } from "@/types";
import { useRoomChatStore } from "@/store/useRoomChatStore";
import { useEffect } from "react";

type MainProps = {
  room: Room;
};

export function Main({ room }: MainProps) {
  const sendMessage = usePlayerStore((state) => state.sendMessage);
  const messages = useRoomMessagesStore((state) => state.messages);
  const socket = useRoomChatStore((state) => state.socket);
  const connectSocket = useRoomChatStore((state) => state.connectSocket);

  useEffect(() => {
    if (!socket) {
      connectSocket();
    }
  }, [socket, connectSocket]);

  return (
    <Box sx={{ position: "relative" }}>
      <Header room={room} />
      <GameChat room={room} messages={messages} />
      <ChatBottom sendMessage={sendMessage} />
    </Box>
  );
}
