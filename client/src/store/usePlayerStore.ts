import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRoomMessagesStore } from "./useRoomMessagesStore";
import { assignRandomColor } from "@/lib/utils";
import { useGameRoomStore } from "./useGameRoomStore";

interface PlayerState {
  name: string;
  color: string;
}

interface PlayerActions {
  setName: (name: string) => void;
  quitGame: (callBack?: () => void) => void;
  sendMessage: (text: string) => void;
}

interface PlayerStore extends PlayerState, PlayerActions {}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      name: "",
      color: assignRandomColor(),

      setName: (name: string) => set({ name }),
      sendMessage: (text: string) =>
        useRoomMessagesStore.getState().sendPlayerMessage(text),
      quitGame: (callBack) => {
        useGameRoomStore.getState().disconnectSocket();
        callBack?.();
      },
    }),
    { name: "player-storage", storage: createJSONStorage(() => localStorage) }
  )
);
