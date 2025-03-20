import { IBotMessage } from "@/interfaces";
import { Avatar, Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

type BotMessageProps = {
  message: IBotMessage;
};

export function BotMessage({ message }: BotMessageProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar
        sx={{
          bgcolor: blue[500],
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
          sx={{ display: "block", textTransform: "capitalize" }}
        >
          Bot
        </Typography>
        <Box
          sx={{
            borderRadius: "7px",
            display: "inline",
            width: "fit-content",
            px: "8px",
            py: "4px",
          }}
          fontSize="small"
          bgcolor={blue[500]}
        >
          {message.text}
        </Box>
      </Box>
    </Box>
  );
}
