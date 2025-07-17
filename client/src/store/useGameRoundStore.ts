import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GameRoundStore {
  words: string;
  timer: number;
  setWords: (words: string) => void;
  setTimer: (timer: number) => void;
}

export const useGameRoundStore = create<GameRoundStore>()(
  persist(
    (set) => ({
      words: "",
      timer: 30,

      setWords: (words: string) => set({ words }),
      setTimer: (timer: number) => set({ timer }),
    }),
    { name: "game-round", storage: createJSONStorage(() => localStorage) }
  )
);
