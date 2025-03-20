import {
  IBotMessage,
  INotificationMessage,
  IPlayerMessage,
  IRoomMessage,
} from "@/interfaces";
import { create } from "zustand";
import { usePlayerStore } from "./usePlayerStore";
import { useGameRoomStore } from "./useGameRoomStore";

interface RoomMessagesState {
  messages: IRoomMessage[];
}

interface RoomMessagesActions {
  sendPlayerMessage: (
    text: string,
    type?: "bot" | "word" | "notification"
  ) => void;
  addMessage?: (text: string, type?: "bot" | "word" | "notification") => void;
  addBotMessage: (text: string) => void;
  addNotificationMessage: (text: string) => void;
  addPlayerMessage: (message: IPlayerMessage) => void;
  clearAllMessages?: () => void;
}

interface RoomMessagesStore extends RoomMessagesState, RoomMessagesActions {}

export const useRoomMessagesStore = create<RoomMessagesStore>((set, get) => ({
  messages: [],

  sendPlayerMessage: (text: string) => {
    const newMessage: IPlayerMessage = {
      type: "player",
      text,
      sender: usePlayerStore.getState().name,
      isGuessed: false,
      isAnagram: true,
    };

    const prevMessages = get().messages;
    if (prevMessages.length > 20)
      set({ messages: [...prevMessages.slice(1), newMessage] });
    else set({ messages: [...prevMessages, newMessage] });

    useGameRoomStore.getState().socket?.emit("player/message", newMessage);
  },

  addBotMessage: (text: string) => {
    const botMessage: IBotMessage = {
      type: "bot",
      text,
    };
    const prevMessages = get().messages;
    if (prevMessages.length > 20)
      set({ messages: [...prevMessages.slice(1), botMessage] });
    else set({ messages: [...prevMessages, botMessage] });
  },

  addNotificationMessage: (text: string) => {
    const notificationMessage: INotificationMessage = {
      type: "notification",
      text,
    };
    set({ messages: [...get().messages, notificationMessage] });
  },

  addPlayerMessage: (message: IPlayerMessage) => {
    const prevMessages = get().messages;
    if (prevMessages.length > 20)
      set({ messages: [...prevMessages.slice(1), message] });
    else set({ messages: [...prevMessages, message] });
  },
}));
