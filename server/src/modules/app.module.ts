import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from '../jobs/tasks.service';
import { RoomGateway } from '../gateways/room.gateway';
import { PlayersService } from '../services/players.service';
import { GameRoomsService } from '../services/game-rooms.service';
import { GameRoomsGateway } from '../gateways/game-rooms.gateway';
import { GameRoomsController } from '../controllers/game-rooms.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  controllers: [GameRoomsController],
  providers: [TasksService, RoomGateway, PlayersService, GameRoomsService, GameRoomsGateway],
})
export class AppModule {}
