import { io } from "socket.io-client";

// socket.on('connect')

export const connect = () => {
  const socket = io("http://localhost:3000");
  socket.id = "20/52HA003";
  socket.connect();
  console.log("clicked");
};
