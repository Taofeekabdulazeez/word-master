/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface IPlayer {
  name: string;
  total_points: number;
  color: string;
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
  id: string;
  sender: string;
  isGuessed: boolean;
  isAnagram: boolean;
  color: string;
}

export type IRoomMessage = IPlayerMessage | IBotMessage | INotificationMessage;
