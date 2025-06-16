"use client";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Badge, Box, styled } from "@mui/material";
import { brown, deepPurple, green, indigo, yellow } from "@mui/material/colors";
import { usePlayersStore } from "@/store/usePlayersStore";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colors = new Map()
  .set(1, deepPurple[500])
  .set(2, brown[500])
  .set(3, green[500])
  .set(4, indigo[500])
  .set(5, yellow[500]);

export default function PlayerList() {
  const players = usePlayersStore((state) => state.players);
  // const sortedPlayers = React.useMemo(
  //   () => players.sort((a, b) => b.points - a.points),
  //   [players]
  // );
  console.log(players);

  return (
    <Box sx={{ overflow: "auto", maxHeight: "100vh" }}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {players.map((player, i) => {
          return (
            <ListItem key={i}>
              <ListItemAvatar>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant={player.active ? "dot" : "standard"}
                >
                  <Avatar
                    sx={{ bgcolor: player.color, textTransform: "uppercase" }}
                  >
                    {player.name.substring(0, 2)}
                  </Avatar>
                </StyledBadge>
              </ListItemAvatar>
              <ListItemText
                primary={player.name}
                secondary={player.points + " points"}
                color={yellow[900]}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
