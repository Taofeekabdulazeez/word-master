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
  //     .set("Henry", { name: "Henry", total_points: 354 })
  //     .set("James", { name: "James", total_points: 312 })
  //     .set("Sofie", { name: "Sofie", total_points: 289 })
  //     .set("Scott", { name: "Scott", total_points: 265 })
  //     .set("Evelyn", { name: "Evelyn", total_points: 231 })
  //     .set("Dave", { name: "Dave", total_points: 192 }),
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
