import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { RoomGateway } from '../gateways/room.gateway';

@Injectable()
export class TasksService {
  private timer: number = 60;
  private wordsGame: string = 'master painters';

  constructor(
    private readonly roomGateway: RoomGateway,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron('*/1 * * * * *', { name: 'startGame' })
  public startTask() {
    if (this.timer === 0) {
      this.timer = 60;
      this.roomGateway.broadCastRoundStarted({ words: this.wordsGame });
    } else {
      this.timer--;
      this.roomGateway.broadCastRoundTimer(this.timer);
    }
  }

  @Cron('*/5 * * * * *', { name: 'word-bot', disabled: true })
  public notifyRoundWords() {
    this.roomGateway.broadCastRoundWords(this.wordsGame);
    const gameJob = this.schedulerRegistry.getCronJob('startGame');
    console.log(gameJob.lastExecution);
  }

}
