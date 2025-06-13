import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectQueue('new-round') private readonly roundQueue: Queue,
  ) {}

  @Get('/new-round')
  public async newRound() {
    await this.roundQueue.add('round', { words: 'master streamers' });
    return {
      message: 'New round Queued',
    };
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
