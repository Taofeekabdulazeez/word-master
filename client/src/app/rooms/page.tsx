import { GameRoomItem } from "@/components/game-room-item";
import { fetchAvailableGameRooms } from "@/server/room.actions";
import { Button, Typography } from "@mui/material";
import { type Metadata } from "next";

export const metatdata: Metadata = {
  title: "Rooms",
};

export default async function Page() {
  const rooms = await fetchAvailableGameRooms();
  console.log(rooms);

  return (
    <div className="p-6 mt-24">
      <div className="grid grid-cols-3 gap-6">
        {rooms.map((room: any) => (
          <GameRoomItem key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
