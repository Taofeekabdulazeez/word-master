import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="h-screen grid place-items-center">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
}
