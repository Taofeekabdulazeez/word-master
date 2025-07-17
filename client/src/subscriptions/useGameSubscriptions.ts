import { useSocketSubscription } from "@/subscriptions/useSocketSubscription";
import { useGameRoomStore } from "@/store/useGameRoomStore";
import { IPlayerMessage } from "@/interfaces";
import { GameEvent } from "@/enums";
import { useGameActions } from "@/hooks/useGameActions";
import { useGameRoundStore } from "@/store/useGameRoundStore";

export function useGameSubscriptions() {
  const socket = useGameRoomStore((state) => state.socket);
  const {
    addBotMessage,
    addNotificationMessage,
    addPlayerMessage,
    setPlayers,
  } = useGameActions();
  const setWords = useGameRoundStore((state) => state.setWords);
  const setTimer = useGameRoundStore((state) => state.setTimer);

  useSocketSubscription({
    socket,
    event: GameEvent.ROUND_STARTED,
    onEmitted: (response) => {
      console.log(response);
      setWords(response.words);
      addBotMessage(`Round has started: Words are ${response.words}`);
    },
  });

  useSocketSubscription({
    socket,
    event: GameEvent.ROUND_TIMER,
    onEmitted: setTimer,
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
