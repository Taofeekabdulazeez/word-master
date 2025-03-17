import { Typography } from "@mui/material";
import { ChatMessage } from "./chat-message";

type GameChatProps = {
  room: {
    id: string;
    title: string;
    players: { name: string; total_points: number }[];
  };
};

export function GameChat({ room }: GameChatProps) {
  return (
    <div>
      <Typography variant="body1" align="center">
        You joined this game room
      </Typography>
      <Typography variant="body2" align="center">
        Welcome to {room.title}
      </Typography>
      <Typography align="center" color="textPrimary">
        There are {room.players.length} in this room
      </Typography>

      <ChatMessage message={{ text: "Hello" }} />
    </div>
  );
}
