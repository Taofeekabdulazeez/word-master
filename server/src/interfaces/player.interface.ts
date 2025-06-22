export interface IPlayer {
  getName(): string;

  setName(name: string): void;

  getPoints(): number;

  setPoints(points: number): void;

  addPoints(points: number): void;

  subtractPoints(points: number): void;

  isActive(): boolean;

  activate(): void;

  deactivate(): void;

  setColor(color: string): void;

  getColor(): string;
}
