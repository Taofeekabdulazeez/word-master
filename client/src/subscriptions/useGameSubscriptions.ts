import { useSocketSubscription } from "@/subscriptions/useSocketSubscription";
import { useGameRoomStore } from "@/store/useGameRoomStore";
import { IPlayerMessage } from "@/interfaces";
import { GameEvent } from "@/enums";
import { useGameActions } from "@/hooks/useGameActions";

export function useGameSubscriptions() {
  const socket = useGameRoomStore((state) => state.socket);
  const {
    addBotMessage,
    addNotificationMessage,
    addPlayerMessage,
    setPlayers,
  } = useGameActions();

  useSocketSubscription({
    socket,
    event: GameEvent.ROUND_STARTED,
    onEmitted: addBotMessage,
  });

  useSocketSubscription({
    socket,
    event: GameEvent.ROUND_ENDED,
    onEmitted: addBotMessage,
  });

  useSocketSubscription({
    socket,
    event: GameEvent.PLAYER_JOINED,
    onEmitted: addNotificationMessage,
  });

  useSocketSubscription({
    socket,
    event: GameEvent.PLAYER_LEFT,
    onEmitted: addNotificationMessage,
  });

  useSocketSubscription<IPlayerMessage>({
    socket,
    event: GameEvent.PLAYER_MESSAGE,
    onEmitted: addPlayerMessage,
  });

  useSocketSubscription({
    event: GameEvent.PLAYERS_UPDATE,
    socket,
    onEmitted: setPlayers,
  });
}
