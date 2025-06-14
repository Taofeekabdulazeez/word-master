import { Injectable } from '@nestjs/common';
import { Player } from '../interfaces';

@Injectable()
export class PlayersService {
  private players: Map<string, Player> = new Map();

  public getPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  public addPlayer({ name, color }: { name: string; color: string }): void {
    if (this.players.has(name)) {
      this.makePlayerActive(name);
      return;
    }
    this.players.set(name, {
      name,
      total_points: 0,
      color,
      isActive: true,
    });
  }

  public makePlayerInActive(name: string): void {
    const player = this.players.get(name);
    if (!player) return;
    player.isActive = false;
    this.players.set(name, player);
  }

  public makePlayerActive(name: string) {
    const player = this.players.get(name);
    if (!player) return;
    player.isActive = true;
    this.players.set(name, player);
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
