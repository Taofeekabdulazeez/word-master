import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { usePlayerStore } from "./usePlayerStore";
import { IRoom } from "@/interfaces";

const BASE_URL = "http://localhost:8000/game-rooms";

export interface GameRoomStore {
  socket: Socket;
  room: IRoom;
  connectSocket: () => void;
  disconnectSocket: () => void;
  setIntializeRoom: (room: IRoom) => void;
}

export const useGameRoomStore = create<GameRoomStore>((set, get) => ({
  socket: null!,
  room: null!,

  setIntializeRoom: (room: IRoom) => set({ room }),

  connectSocket: () => {
    const socket = io(`${BASE_URL}`, {
      query: {
        player: usePlayerStore.getState().name,
        color: usePlayerStore.getState().color,
        room: "1",
      },
    });

    socket.connect();
    set({ socket: socket });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
