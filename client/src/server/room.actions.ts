"use server";
import { wait } from "@/lib/utils";
import { Room } from "@/types";
import { redirect } from "next/navigation";

const roomId = "97937wecbwc";

export const fetchRoom = async (id: string): Promise<Room> => {
  await wait(5000);

  return {
    id,
    title: "The Sapphires",
    players: [
      { name: "Henry", total_points: 354 },
      { name: "James", total_points: 312 },
      { name: "Sofie", total_points: 289 },
      { name: "Scott", total_points: 265 },
      { name: "Evelyn", total_points: 231 },
      { name: "Dave", total_points: 192 },
    ],
  };
};

export const findAvailableRoom = async () => {
  await wait(3000);

  // return {
  //   id: roomId,
  // };

  return redirect(`/${roomId}`);
};
