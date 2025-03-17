"use client";
import { Header } from "./header";
import { GameChat } from "./game-chat";
import { ChatBottom } from "./chat-bottom";
import { Box } from "@mui/material";

type MainProps = {
  room: {
    id: string;
    title: string;
    players: { name: string; total_points: number }[];
  };
};

export function Main({ room }: MainProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <Header title={room.title} />
      <GameChat room={room} />
      <ChatBottom />
    </Box>
  );
}
