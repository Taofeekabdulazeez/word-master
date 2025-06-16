"use client";

import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type GameRoomItemProps = {
  room: any;
};

export function GameRoomItem({ room }: GameRoomItemProps) {
  const router = useRouter();

  return (
    <div key={room.id} className="border px-3 min-h-[200px] rounded-md">
      <Typography>Room {room.id}</Typography>
      <Typography className="mb-4">
        There are {room.players.length} players in this room
      </Typography>
      <Button onClick={() => router.push(`/${room.id}`)} variant="contained">
        Join room!
      </Button>
    </div>
  );
}
