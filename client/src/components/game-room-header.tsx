"use client";
import { useGameRoomStore } from "@/store/useGameRoomStore";
import { Container, Typography } from "@mui/material";

export function GameRoomHeader() {
  const room = useGameRoomStore((state) => state?.room);
  return (
    <Container sx={{ height: "10vh" }}>
      <Typography variant="h6" align="center">
        {room?.title}
      </Typography>
    </Container>
  );
}
