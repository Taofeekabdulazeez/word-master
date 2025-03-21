"use client";
import { Box, Typography } from "@mui/material";
import PlayerList from "./player-list";

export function GameRoomSideBar() {
  return (
    <aside>
      <GameRoomSideBarHeader />
      <PlayerList />
    </aside>
  );
}

function GameRoomSideBarHeader() {
  return (
    <Box sx={{ height: "8vh" }}>
      <Typography align="center" marginTop={3}>
        Players
      </Typography>
    </Box>
  );
}
