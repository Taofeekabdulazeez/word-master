import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRoomMessagesStore } from "./useRoomMessagesStore";

interface PlayerState {
  name: string;
}

interface PlayerActions {
  setName: (name: string) => void;
  quitGame: () => void;
  sendMessage: (text: string) => void;
}

interface PlayerStore extends PlayerState, PlayerActions {}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      name: "",
      setName: (name: string) => set({ name }),
      sendMessage: (text: string) =>
        useRoomMessagesStore.getState().sendPlayerMessage(text),
      quitGame: () => {},
    }),
    { name: "player-storage", storage: createJSONStorage(() => localStorage) }
  )
);
