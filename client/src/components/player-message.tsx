"use client";
import { usePlayerStore } from "@/store/usePlayerStore";
import { IPlayerMessage } from "@/interfaces";
import { Avatar, Box, Typography } from "@mui/material";

type PlayerMessageProps = {
  message: IPlayerMessage;
};

export function PlayerMessage({ message }: PlayerMessageProps) {
  const player = usePlayerStore((state) => state.name);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          sx={{
            bgcolor: message.color,
            width: "30px",
            height: "30px",
          }}
        >
          {/* {message.sender.substring(0, 2)} */}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.1 }}>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: "block" }}
          >
            {message.sender}
            {message.sender === player ? " (You)" : null}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box
              sx={{
                borderRadius: "7px",
                display: "inline",
                width: "fit-content",
                px: "8px",
                py: "4px",
              }}
              fontSize="small"
              bgcolor={message.color}
            >
              {message.text}
            </Box>
            {/* {message.isAnagram && (
              <Typography
                fontSize="small"
                sx={{ display: "flex", alignItems: "center", gap: 0.3 }}
                color={message.isGuessed ? pink[400] : green[400]}
              >
                {message.isGuessed ? (
                  <Close fontSize="small" />
                ) : (
                  <Check fontSize="small" sx={{ stroke: green["A100"] }} />
                )}
                {message.isGuessed
                  ? "This word has been guessed"
                  : `${
                      message.sender === player ? "You" : message.sender
                    } won +${Math.round(message.text.length / 2)} points`}
              </Typography>
            )} */}
          </Box>
        </Box>
      </Box>
    </>
  );
}
