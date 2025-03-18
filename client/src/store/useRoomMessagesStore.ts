import { Message } from "@/types";
import { create } from "zustand";
import { usePlayerStore } from "./usePlayerStore";

interface RoomMessagesState {
  messages: Message[];
}

interface RoomMessagesActions {
  sendMessage: (text: string) => void;
  clearAllMessages?: () => void;
}

interface RoomMessagesStore extends RoomMessagesState, RoomMessagesActions {}

export const useRoomMessagesStore = create<RoomMessagesStore>((set, get) => ({
  messages: [],
  sendMessage: (text: string) => {
    const sender = usePlayerStore.getState().name;
    const newMessage: Message = {
      text,
      sender,
    };
    set({ messages: [...get().messages, newMessage] });
  },
}));
