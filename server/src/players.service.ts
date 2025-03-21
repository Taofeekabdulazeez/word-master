import { Injectable } from '@nestjs/common';
import { Player } from './interface';

@Injectable()
export class PlayersService {
  private players: Map<string, Player> = new Map();

  public getPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  public addPlayer({ name, color }: { name: string; color: string }): void {
    if (this.players.has(name)) return;
    this.players.set(name, {
      name,
      total_points: 0,
      color,
    });
  }

  public makePlayerOffline(name: string): void {
    this.players.delete(name);
  }

  public deletePlayer(name: string): void {
    this.players.delete(name);
  }

  public updatePlayerPoints(name: string, points: number): void {
    const player = this.players.get(name);
    if (!player) return;
    player.total_points += points;
    this.players.set(name, player);
  }

  private assignRandomColor(): string {
    const colors = [
      '#ff5722',
      '#673ab7',
      '#795548',
      '#4caf50',
      '#3f51b5',
      '#ffeb3b',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
