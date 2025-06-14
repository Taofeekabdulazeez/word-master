export class Player {
    private name: string;
    private points: number;
    private color: string;
    private active: boolean;

    constructor(name: string) {
        this.name = name;
        this.points = 0;
        this.active = true;
        this.color = Player.getRandomColor();
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name
    }

    public getPoints(): number {
        return this.points;
    }

    public setPoints(points: number): void {
        this.points = points;     
    }

    public addPoints(points: number): void {
        this.points += points;    
    }

    public subtractPoints(points: number): void {
        this.points -= points;    
    }

    public isActive(): boolean {
        return this.active;
    }
    
    public activate(): void {
        this.active = true;
    }

    public deActivate(): void {
        this.active = false;
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public getColor(): string {
        return this.color;
    }


    private static getRandomColor(): string {
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
                    