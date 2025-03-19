import { Room } from "@/types";
import { Container, Typography } from "@mui/material";

type HeaderProps = {
  room: Room;
};

export function Header({ room }: HeaderProps) {
  return (
    <Container sx={{ height: "10vh" }}>
      <Typography variant="h6" align="center">
        {room.title}
      </Typography>
    </Container>
  );
}
