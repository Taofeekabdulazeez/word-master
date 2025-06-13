"use client";
import { Button, TextField, Typography } from "@mui/material";
import ModeSwitch from "@/components/mode-switch";
import { startTransition, useActionState } from "react";
import { findAvailableRoom } from "@/server/room.actions";
import { usePlayerStore } from "@/store/usePlayerStore";

export default function Home() {
  const { name, setName } = usePlayerStore();
  const [, action, isPending] = useActionState(findAvailableRoom, undefined);

  return (
    <div>
      <div>
        <ModeSwitch />
      </div>
      <Typography className="text-center" sx={{ mb: 6 }}>
        Welcome to the Anagram Game, kindly input your name
      </Typography>
      <div className="flex items-center gap-6 justify-center">
        <TextField
          disabled={isPending}
          label="Name"
          type="name"
          value={name}
          variant="outlined"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="flex items-center justify-center mt-8">
        <Button
          disabled={isPending}
          loading={isPending}
          variant="contained"
          onClick={() => startTransition(action)}
        >
          Play Now!
        </Button>
      </div>
    </div>
  );
}
