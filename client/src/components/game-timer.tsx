"use client";

import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type GameTimerProps = {
  time: number;
};

export function GameTimer({ time }: GameTimerProps) {
  const [count, setCount] = useState(time);
  const timeRef = useRef<NodeJS.Timeout>(null!);
  const minutes = String(Math.trunc(count / 60)).padStart(2, "0");
  const seconds = String(Math.trunc(count % 60)).padStart(2, "0");

  useEffect(() => {
    timeRef.current = setInterval(
      () => setCount((c) => (c > 0 ? c - 1 : 0)),
      1000
    );

    return () => {
      clearInterval(timeRef.current);
    };
  }, []);

  return (
    <Typography>
      {minutes}:{seconds}
    </Typography>
  );
}
