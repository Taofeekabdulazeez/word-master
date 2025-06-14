import { Player } from "./player";

export class Game {
    private id: string;
    private players: Map<string, Player> = new Map();

    constructor(id: string) {
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }

    public getPlayers(): Player[] {
        return Game.sort(Array.from(this.players.values()));
    }

    public addPlayer(name: string): void {
        this.players.set(name, new Player(name));
    }

    public getPlayer(name: string): Player {
        return this.players.get(name)
    }

    public removePlayer(name: string): void {
        this.players.delete(name);
    }

    public hasPlayer(name: string): boolean {
        return this.players.has(name);
    } 

    public static sort(players: Player[]): Player[] {
        return Array.from(players.values()).sort((a, b) => b.getPoints() - a.getPoints());
    }
}