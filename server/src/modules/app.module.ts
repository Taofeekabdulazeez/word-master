import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PlayersService } from '../services/players.service';
import { GameRoomsService } from '../services/game-rooms.service';
import { GameRoomsGateway } from '../gateways/game-rooms.gateway';
import { GameRoomsController } from '../controllers/game-rooms.controller';
import { GameJobs } from 'src/jobs/game.jobs';
import { WordsService } from 'src/services/words.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [GameRoomsController],
  providers: [
    PlayersService,
    GameRoomsService,
    WordsService,
    GameRoomsGateway,
    GameJobs,
  ],
})
export class AppModule {}
