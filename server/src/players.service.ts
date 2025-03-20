import { Injectable } from '@nestjs/common';
import { Player } from './interface';

@Injectable()
export class PlayersService {
  private players: Map<string, Player> = new Map();

  public getPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  public addPlayer(name: string): void {
    this.players.set(name, { name, total_points: 0 });
  }

  public makePlayerOffline(name: string): void {
    this.players.delete(name);
  }

  public deletePlayer(name: string): void {
    this.players.delete(name);
  }
}
