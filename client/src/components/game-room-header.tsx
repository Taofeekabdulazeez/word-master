import { IRoom } from "@/interfaces";
import { Container, Typography } from "@mui/material";

type GameRoomHeaderProps = {
  room: IRoom;
};

export function GameRoomHeader({ room }: GameRoomHeaderProps) {
  return (
    <Container sx={{ height: "10vh" }}>
      <Typography variant="h6" align="center">
        {room.title}
      </Typography>
    </Container>
  );
}
