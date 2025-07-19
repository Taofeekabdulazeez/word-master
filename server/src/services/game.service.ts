import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  private timer: number = 60;

  constructor() {
    this.startGameLoop();
  }

  private resetGame() {
    this.timer = 60;
    this.startCountdown();
  }

  private startGameLoop() {
    setInterval(() => this.resetGame(), 10000);
  }

  private startCountdown() {
    const countdownInterval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(countdownInterval);
        console.log('Game will restart in 60 seconds');
      }
      console.log(this.timer);
    }, 1000);
  }
}
