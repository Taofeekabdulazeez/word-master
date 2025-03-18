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
  messages: [
    { text: "master", sender: "Scott", isGuessed: false, isAnagram: true },
    { text: "stream", sender: "Scott", isGuessed: true, isAnagram: true },
    { text: "maters", sender: "Scott", isGuessed: false, isAnagram: false },
  ],

  sendMessage: (text: string) => {
    const sender = usePlayerStore.getState().name;
    const newMessage: Message = {
      text,
      sender,
      isGuessed: false,
      isAnagram: true,
    };
    set({ messages: [...get().messages, newMessage] });
  },
}));
