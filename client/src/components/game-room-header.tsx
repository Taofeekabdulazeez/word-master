"use client";
import { useGameRoomStore } from "@/store/useGameRoomStore";
import { useGameRoundStore } from "@/store/useGameRoundStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { GameTimer } from "./game-timer";

export function GameRoomHeader() {
  const room = useGameRoomStore((state) => state?.room);
  const quitGame = usePlayerStore((state) => state.quitGame);
  const router = useRouter();
  const words = useGameRoundStore((state) => state.words);
  const timer = useGameRoundStore((state) => state.timer);

  return (
    <Container
      sx={{
        height: "10vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography align="center">Room {room.id}</Typography>
      <Typography variant="h6" align="center">
        {words}
      </Typography>
      <GameTimer time={timer} />
      <Button
        size="small"
        variant="contained"
        sx={{ backgroundColor: "#d32f2f", color: "#fff" }}
        onClick={() => quitGame(() => router.push("/"))}
      >
        Leave room
      </Button>
    </Container>
  );
}
