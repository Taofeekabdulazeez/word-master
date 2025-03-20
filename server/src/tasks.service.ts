import { Injectable } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { RoomGateway } from './room.gateway';
import { CronJob } from 'cron';

@Injectable()
export class TasksService {
  private timer: number = 20;

  constructor(
    private readonly roomGateway: RoomGateway,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron('*/1 * * * * *', { name: 'startGame' })
  public startTask() {
    if (this.timer === 0) {
      this.timer = 20;
      this.roomGateway.broadCastRoundStarted();
    } else {
      this.timer--;
    }
  }

  //   @Cron('*/30 * * * * *', { name: 'startGame' })
  //   public startTask() {
  //     this.roomGateway.broadCastRoundStarted();
  //   }

  //   @Cron('*/29 * * * * *', { name: 'endGame' })
  //   public endTask() {
  //     this.roomGateway.broadCastRoundEnded();
  //   }

  //   @Timeout(3000)
  //   public notify() {
  //     this.roomGateway.notifyNextRound();
  //   }

  //   @Cron('*/10 * * * * *', { name: 'timer', disabled: false })
  //   public startTimer() {
  //     const interval = this.schedulerRegistry.getCronJob('startGame');
  //     console.log('Timer is running', interval.waitForCompletion);
  //   }
}
