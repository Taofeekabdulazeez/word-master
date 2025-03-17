import { Send } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";

export function ChatBottom() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        py: "30px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        width: "100%",
      }}
    >
      <TextField sx={{}} size="small" />
      <Button variant="contained" endIcon={<Send />}></Button>
    </Box>
  );
}
