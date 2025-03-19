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
    { text: "armest", sender: "Scott", isGuessed: true, isAnagram: false },
    { text: "tamers", sender: "Scott", isGuessed: false, isAnagram: true },
    { text: "teamsr", sender: "Scott", isGuessed: false, isAnagram: false },
    { text: "stearm", sender: "Scott", isGuessed: true, isAnagram: true },
    { text: "resmat", sender: "Scott", isGuessed: false, isAnagram: false },
    { text: "reamst", sender: "Scott", isGuessed: true, isAnagram: true },
    { text: "mars", sender: "Scott", isGuessed: false, isAnagram: false },
    { text: "stream", sender: "Scott", isGuessed: false, isAnagram: true },
    { text: "mastery", sender: "Scott", isGuessed: false, isAnagram: false },
    { text: "armset", sender: "Scott", isGuessed: true, isAnagram: true },
    { text: "terams", sender: "Scott", isGuessed: false, isAnagram: true },
    { text: "tsamer", sender: "Scott", isGuessed: false, isAnagram: true },
    { text: "marker", sender: "Scott", isGuessed: true, isAnagram: false },
    { text: "asterm", sender: "Scott", isGuessed: false, isAnagram: true },
    { text: "smart", sender: "Scott", isGuessed: true, isAnagram: false },
    { text: "remast", sender: "Scott", isGuessed: false, isAnagram: true },
    { text: "masters", sender: "Scott", isGuessed: false, isAnagram: false },
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
