import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { usePlayerStore } from "./usePlayerStore";

const BASE_URL = "http://localhost:3000/room";

export interface RoomChatStore {
  socket: Socket;
  subscribeToMessages: () => void;
  connectSocket: () => void;
}

export const useRoomChatStore = create<RoomChatStore>((set, get) => ({
  socket: null!,

  subscribeToMessages: () => {},

  connectSocket: () => {
    const socket = io(`${BASE_URL}`, {
      query: {
        player: usePlayerStore.getState().name,
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
