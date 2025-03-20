"use client";

import { useGameSubscriptions } from "@/store/useGameSubscriptions";
import { RoomMessages } from "./room-messages";

export function GameRoomChat() {
  useGameSubscriptions();

  return <RoomMessages />;
}
