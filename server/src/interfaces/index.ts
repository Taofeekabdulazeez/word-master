export interface Player {
  name: string;
  points: number;
  color: string;
  isActive: boolean;
}

export interface ClientQueries {
  playerId: string;
  roomId: string;
}
