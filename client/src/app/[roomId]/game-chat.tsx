import { Container, Typography } from "@mui/material";
import { ChatMessage } from "./chat-message";
import { Message, Room } from "@/types";

type GameChatProps = {
  room: Room;
  messages: Message[];
};

export function GameChat({ room, messages }: GameChatProps) {
  return (
    <div>
      <Typography variant="body1" align="center" fontSize={12}>
        You joined this game room
      </Typography>
      <Typography align="center" color="textPrimary" fontSize={10}>
        There are {room.players.length} in this room
      </Typography>

      <Container
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {messages.map((message, i) => {
          return <ChatMessage key={i} message={message} />;
        })}
      </Container>
    </div>
  );
}
