import { GameRoom } from "../models/game-room";
import { GameRoomsService } from "../services/game-rooms.service";
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('game-rooms')
export class GameRoomsController {
  constructor(private readonly gameRoomsService: GameRoomsService) {}

  @Get()                     
  public getAllRooms() {
    return this.gameRoomsService.getAllRooms();
  }             

  @Post()
  public createRoom(@Body() body: any): GameRoom {
    return this.gameRoomsService.createRoom();
  }

  @Get(':id')
  public getRoom(id: string): GameRoom {
    return this.gameRoomsService.getRoom(id);
  }

  @Delete(':id')
  public deleteRoom(id: string): void {
    this.gameRoomsService.deleteRoom(id);
  }
     
}