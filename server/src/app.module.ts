import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { RoomGateway } from './room.gateway';
import { PlayersService } from './players.service';
import { GameRoomsService } from './game-rooms.service';
import { GameRoomsGateway } from './game-rooms.gateway';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // BullModule.forRoot({
    //   connection: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),
    // BullModule.registerQueue({ name: 'new-round' }),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, RoomGateway, PlayersService, GameRoomsService, GameRoomsGateway],
})
export class AppModule {}
