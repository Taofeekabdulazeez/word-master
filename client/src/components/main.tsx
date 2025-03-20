"use client";
import { GameRoomHeader } from "./game-room-header";
import { GameRoomChat } from "./game-room-chat";
import { GameRoomBottomBar } from "./game-room-bottom-bar";
import { Box } from "@mui/material";
import { IRoom } from "@/interfaces";
import { useGameRoomStore } from "@/store/useGameRoomStore";
import { useEffect } from "react";

type MainProps = {
  room: IRoom;
};

export function Main({ room }: MainProps) {
  const socket = useGameRoomStore((state) => state.socket);
  const connectSocket = useGameRoomStore((state) => state.connectSocket);

  useEffect(() => {
    if (!socket) {
      connectSocket();
    }
  }, [socket, connectSocket]);

  return (
    <Box sx={{ position: "relative" }}>
      <GameRoomHeader room={room} />
      <GameRoomChat />
      <GameRoomBottomBar />
    </Box>
  );
}
