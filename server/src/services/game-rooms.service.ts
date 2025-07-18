import { Injectable } from '@nestjs/common';
import { GameRoom } from '../models/game-room';
import { Player } from '../models/player';
import { WordsService } from './words.service';

@Injectable()
export class GameRoomsService {
  constructor(private readonly wordsService: WordsService) {}

  private rooms: Map<string, GameRoom> = new Map<string, GameRoom>().set(
    '1',
    new GameRoom('1'),
  );

  public createRoom(): GameRoom {
    const id = String(Math.random());
    const game = new GameRoom(id);
    this.rooms.set(id, game);
    return game;
  }

  public getRoom(id: string): GameRoom {
    return this.rooms.get(id);
  }

  public deleteRoom(id: string): void {
    this.rooms.delete(id);
  }

  public hasRoom(id: string): boolean {
    return this.rooms.has(id);
  }

  public getAllRooms() {
    const rooms = Array.from(this.rooms.values());
    const r = rooms.map((r) => ({ ...r, players: r.getPlayers() }));
    console.log('All Rooms:', rooms);
    return r;
  }

  public connectPlayer(roomId: string, player: string, color: string): void {
    const room = this.getRoom(roomId);
    if (!room.hasPlayer(player)) room.addPlayer(player, color);
    else room.getPlayer(player).activate();
  }

  public disconnectPlayer(roomId: string, playerId: string): void {
    const room = this.getRoom(roomId);
    if (!room.hasPlayer(playerId)) return;

    room.getPlayer(playerId).deactivate();
  }

  public sendRoomMessage(
    roomId: string,
    message: { text: string; playerId: string },
  ): void {
    const room = this.getRoom(roomId);
    if (!room) return;
    const player = room.getPlayer(message.playerId);

    if (room.isGuessedWord(message.text)) {
      return;
    }

    if (this.wordsService.isAnagram(message.text, room.getWords())) {
      room.addGuessedWords(message.text);
      player.addPoints(message.text.length);
    }
  }

  public getRoomPlayers(roomId: string): Player[] {
    const room = this.getRoom(roomId);
    if (!room) return [];
    return room.getPlayers();
  }

  public setNewRounds(): void {
    for (const [key] of this.rooms) {
      const room = this.rooms.get(key);
      room.setWords(this.wordsService.getRandomWord());
      room.resetGuessedWords();
      room.incrementRound();
    }
  }
}
