/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Socket } from "socket.io-client";

interface UseSocketSubscription<T = any> {
  event: string;
  socket: Socket | null;
  onEmitted?: (message: T) => void;
}

export function useSocketSubscription<T = any>({
  socket,
  event,
  onEmitted,
}: UseSocketSubscription<T>) {
  useEffect(() => {
    socket?.on(event, (message: T) => onEmitted?.(message));

    return () => {
      socket?.off(event);
    };
  }, [socket, onEmitted, event]);
}
