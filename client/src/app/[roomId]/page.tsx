import { fetchRoom } from "@/server/room.actions";
import { PageProps } from "@/types";
import { SideBar } from "@/components/sidebar";
import { Main } from "@/components/main";
import { GameRoomHydration } from "./game-room-hydration";

export default async function Page({ params }: PageProps) {
  const { roomId } = await params;
  const room = await fetchRoom(roomId);

  return (
    <div className="grid grid-cols-[1.3fr_4fr] h-screen overflow-y-hidden">
      <GameRoomHydration initialData={room}>
        <SideBar />
        <Main room={room} />
      </GameRoomHydration>
    </div>
  );
}
