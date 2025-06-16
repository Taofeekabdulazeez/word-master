import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="h-screen grid place-items-center">
      <Box sx={{ display: "flex", gap: "4px" }}>
        <CircularProgress />
        <span>Loading Available rooms</span>
      </Box>
    </div>
  );
}
