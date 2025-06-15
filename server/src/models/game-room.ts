import { Player } from './player';

export class GameRoom {
  private id: string;
  private players: Map<string, Player> = new Map();

  constructor(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public getPlayers(): Player[] {
    return GameRoom.sort(Array.from(this.players.values()));
  }

  public addPlayer(id: string): void {
    this.players.set(id, new Player(id));
  }

  public getPlayer(id: string): Player {
    return this.players.get(id);
  }

  public removePlayer(id: string): void {
    this.players.delete(id);
  }

  public hasPlayer(id: string): boolean {
    return this.players.has(id);
  }

  public static sort(players: Player[]): Player[] {
    return Array.from(players.values()).sort(
      (a, b) => b.getPoints() - a.getPoints(),
    );
  }
}
