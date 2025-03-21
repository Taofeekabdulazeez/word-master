import { useRoomMessagesStore } from "@/store/useRoomMessagesStore";
import { usePlayersStore } from "@/store/usePlayersStore";

export function useGameActions() {
  const addBotMessage = useRoomMessagesStore((state) => state.addBotMessage);
  const addNotificationMessage = useRoomMessagesStore(
    (state) => state.addNotificationMessage
  );
  const addPlayerMessage = useRoomMessagesStore(
    (state) => state.addPlayerMessage
  );
  const setPlayers = usePlayersStore((state) => state.setPlayers);

  return {
    addBotMessage,
    addNotificationMessage,
    addPlayerMessage,
    setPlayers,
  };
}
