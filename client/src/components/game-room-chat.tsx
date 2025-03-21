"use client";

import { useGameSubscriptions } from "@/subscriptions/useGameSubscriptions";
import { GameRoomMessages } from "./game-room-messages";

export function GameRoomChat() {
  useGameSubscriptions();

  return <GameRoomMessages />;
}
