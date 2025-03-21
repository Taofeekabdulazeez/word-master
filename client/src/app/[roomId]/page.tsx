import { fetchRoom } from "@/server/room.actions";
import { PageProps } from "@/types";
import { GameRoom } from "@/components/game-room";
import { GameRoomHydration } from "./game-room-hydration";

export default async function Page({ params }: PageProps) {
  const { roomId } = await params;
  const room = await fetchRoom(roomId);

  return (
    <GameRoomHydration initialData={room}>
      <GameRoom />
    </GameRoomHydration>
  );
}
