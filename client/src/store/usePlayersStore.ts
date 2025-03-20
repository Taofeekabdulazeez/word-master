import { IPlayer } from "@/interfaces";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PlayersStore {
  players: IPlayer[];
  addNewPlayer?: (player: IPlayer) => void;
  setPlayers?: (players: IPlayer[]) => void;
}

export const usePlayersStore = create<PlayersStore>()(
  persist(
    (set) => ({
      players: [],

      setPlayers: (players: IPlayer[]) => set({ players }),
    }),
    { name: "players-storage", storage: createJSONStorage(() => localStorage) }
  )
);
