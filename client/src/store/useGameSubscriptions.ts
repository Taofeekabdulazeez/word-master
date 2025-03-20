import { useSocketSubscription } from "@/hooks/useSocketSubscription";
import { useGameRoomStore } from "@/store/useGameRoomStore";
import { useRoomMessagesStore } from "@/store/useRoomMessagesStore";
import { IPlayerMessage } from "@/interfaces";
import { usePlayersStore } from "./usePlayersStore";

export function useGameSubscriptions() {
  const socket = useGameRoomStore((state) => state.socket);
  const addBotMessage = useRoomMessagesStore((state) => state.addBotMessage);
  const addNotificationMessage = useRoomMessagesStore(
    (state) => state.addNotificationMessage
  );
  const addPlayerMessage = useRoomMessagesStore(
    (state) => state.addPlayerMessage
  );
  const setPlayers = usePlayersStore((state) => state.setPlayers);

  useSocketSubscription({
    socket,
    event: "round/started",
    onEmitted: addBotMessage,
  });

  useSocketSubscription({
    socket,
    event: "round/ended",
    onEmitted: addBotMessage,
  });

  useSocketSubscription({
    socket,
    event: "player/joined",
    onEmitted: addNotificationMessage,
  });

  useSocketSubscription({
    socket,
    event: "player/left",
    onEmitted: addNotificationMessage,
  });

  useSocketSubscription<IPlayerMessage>({
    socket,
    event: "player/message",
    onEmitted: addPlayerMessage,
  });

  useSocketSubscription({
    event: "players/update",
    socket,
    onEmitted: setPlayers,
  });
}
