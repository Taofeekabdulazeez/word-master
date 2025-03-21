import { IPlayerMessage, IRoomMessage } from "@/interfaces";
import { BotMessage } from "./bot-message";
import { NotificationMessage } from "./notification-message";
import { PlayerMessage } from "./player-message";

type RoomMessageProps = {
  message: IRoomMessage;
};

export function GameRoomMessage({ message }: RoomMessageProps) {
  switch (message.type) {
    case "bot":
      return <BotMessage message={message} />;
    case "notification":
      return <NotificationMessage message={message} />;
    case "player":
      return <PlayerMessage message={message as IPlayerMessage} />;
    default:
      return null;
  }
}
