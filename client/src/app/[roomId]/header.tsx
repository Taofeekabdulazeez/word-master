import { Container, Typography } from "@mui/material";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <Container sx={{ padding: "20px" }}>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
    </Container>
  );
}
