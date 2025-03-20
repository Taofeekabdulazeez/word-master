/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface IPlayer {
  name: string;
  total_points: number;
}

export interface IRoom {
  id: string;
  title: string;
  players: IPlayer[];
}

export interface IMessage {
  type: "bot" | "word" | "notification" | "player";
  text: string;
}

export interface IBotMessage extends IMessage {}

export interface INotificationMessage extends IMessage {}

export interface IPlayerMessage extends IMessage {
  sender: string;
  isGuessed: boolean;
  isAnagram: boolean;
}

export type IRoomMessage = IPlayerMessage | IBotMessage | INotificationMessage;
