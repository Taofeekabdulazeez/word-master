import { Player } from './player';

export class GameRoom {
  private id: string;
  private players: Map<string, Player> = new Map();
  private rounds: number = 0;
  private words: string;
  private guessedWords: Array<string> = [];

  constructor(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public getPlayers(): Player[] {
    return GameRoom.sort(Array.from(this.players.values()));
  }

  public addPlayer(id: string, color: string): void {
    this.players.set(id, new Player(id, color));
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

  public incrementRound(): void {
    this.rounds++;
  }

  public setRounds(rounds: number): void {
    this.rounds = rounds;
  }

  public getRounds(): number {
    return this.rounds;
  }

  public setWords(words: string): void {
    this.words = words;
  }

  public getWords(): string {
    return this.words;
  }

  public getGuessedWords(): string[] {
    return this.guessedWords;
  }

  public addGuessedWords(words: string): void {
    this.guessedWords.push(words);
  }

  public isGuessedWord(word: string): boolean {
    console.log(this.guessedWords);
    return this.guessedWords.includes(word);
  }

  public resetGuessedWords(): void {
    this.guessedWords = [];
  }
}
