"use client";
import { GameRoomHeader } from "./game-room-header";
import { GameRoomChat } from "./game-room-chat";
import { GameRoomBottomBar } from "./game-room-bottom-bar";
import { Box } from "@mui/material";
import { useGameRoomStore } from "@/store/useGameRoomStore";
import { useEffect } from "react";
import { GameRoomSideBar } from "./game-room-sidebar";

export function GameRoom() {
  const socket = useGameRoomStore((state) => state.socket);
  const connectSocket = useGameRoomStore((state) => state.connectSocket);

  useEffect(() => {
    if (!socket) connectSocket();
  }, [socket, connectSocket]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1.3fr 4fr",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <GameRoomSideBar />
      <Box sx={{ position: "relative" }}>
        <GameRoomHeader />
        <GameRoomChat />
        <GameRoomBottomBar />
      </Box>
    </Box>
  );
}
