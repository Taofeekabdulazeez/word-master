import { create } from "zustand";
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

export const usePlayerStore = create<PlayerStore>((set) => ({
  name: "",
  setName: (name: string) => set({ name }),
  sendMessage: (text: string) =>
    useRoomMessagesStore.getState().sendMessage(text),
  quitGame: () => {},
}));
