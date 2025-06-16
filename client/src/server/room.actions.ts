"use server";
import { wait } from "@/lib/utils";
import { IRoom } from "@/interfaces";
import { redirect } from "next/navigation";

const roomId = "97937wecbwc";

export const fetchRoom = async (id: string): Promise<IRoom> => {
  await wait(2000);

  return {
    id,
    title: "The Sapphires",
    players: [],
  };
  //   players: new Map()
  //     .set("Henry", { name: "Henry", points: 354 })
  //     .set("James", { name: "James", points: 312 })
  //     .set("Sofie", { name: "Sofie", points: 289 })
  //     .set("Scott", { name: "Scott", points: 265 })
  //     .set("Evelyn", { name: "Evelyn", points: 231 })
  //     .set("Dave", { name: "Dave", points: 192 }),
};

export const findAvailableRoom = async () => {
  try {
    await wait(2000);

    return { success: true };
  } catch {
  } finally {
    redirect(`/${roomId}`);
  }

  // return {
  //   id: roomId,
  // };
};

export const fetchAvailableGameRooms = async () => {
  const response = await fetch(`http://localhost:8000/game-rooms`);
  const data = await response.json();

  return data;
};
