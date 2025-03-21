"use client";

import { IRoom } from "@/interfaces";
import { useGameRoomStore } from "@/store/useGameRoomStore";
import { usePlayersStore } from "@/store/usePlayersStore";
import { useEffect } from "react";

type GameRoomHydrationProps = {
  initialData: IRoom;
  children: React.ReactNode;
};

export function GameRoomHydration({
  initialData,
  children,
}: GameRoomHydrationProps) {
  useEffect(() => {
    useGameRoomStore.setState({ room: initialData });
    usePlayersStore.setState({ players: initialData.players });
  }, [initialData]);

  return children;
}
