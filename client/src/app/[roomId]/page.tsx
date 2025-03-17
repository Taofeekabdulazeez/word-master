import { fetchRoom } from "@/server/room.actions";
import { PageProps } from "@/types";
import { SideBar } from "./sidebar";
import { Main } from "./main";

export default async function Page({ params }: PageProps) {
  const { roomId } = await params;
  const room = await fetchRoom(roomId);
  console.log(room);
  return (
    <div className="grid grid-cols-[1fr_4fr] h-screen">
      <SideBar players={room.players} />
      <Main room={room} />
    </div>
  );
}
