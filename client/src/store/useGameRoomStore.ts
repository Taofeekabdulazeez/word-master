import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { usePlayerStore } from "./usePlayerStore";
import { IRoom } from "@/interfaces";

const BASE_URL = "http://localhost:8000/room";

export interface GameRoomStore {
  socket: Socket;
  connectSocket: () => void;
  room: IRoom;
  setIntializeRoom: (room: IRoom) => void;
}

export const useGameRoomStore = create<GameRoomStore>((set, get) => ({
  socket: null!,
  room: null!,

  setIntializeRoom: (room: IRoom) => set({ room: room }),

  connectSocket: () => {
    const socket = io(`${BASE_URL}`, {
      query: {
        player: usePlayerStore.getState().name,
        color: usePlayerStore.getState().color,
      },
    });

    socket.connect();
    console.log("success has connected");

    set({ socket: socket });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
