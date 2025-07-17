import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { GameRoomsGateway } from 'src/gateways/game-rooms.gateway';

@Injectable()
export class GameJobs {
  private readonly logger: Logger = new Logger(GameJobs.name);

  constructor(
    private readonly gameRoomsGateway: GameRoomsGateway,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS, { name: 'startGame' })
  public startNewRound() {
    this.logger.log('New round started');
    this.gameRoomsGateway.broadcastNewRound();
  }
}
