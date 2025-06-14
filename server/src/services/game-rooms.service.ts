import { Game } from "../models/game";
import { Player } from "../models/player";

export class GameRoomsService {
    private rooms: Map<string, Game> = new Map<string, Game>().set('1', new Game('1'));

    public createRoom(): Game {
        const id = String(Math.random())
        const game = new Game(id);
        this.rooms.set(id, game);
        return game;
    }

    public getRoom(id: string): Game {
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
        const r = rooms.map(r => ({...r, players: r.getPlayers()}))
        console.log('All Rooms:', rooms);
        return r;
    }

    public connectPlayer(roomId: string, player: string): void {
        const room = this.getRoom(roomId);
        if (!room.hasPlayer(player))
            room.addPlayer(player);
        else 
           room.getPlayer(player).activate();
    }

    public disconnectPlayer(roomId: string, playerId: string): void {
        const room = this.getRoom(roomId);
        if (!room.hasPlayer(playerId)) return; 
        
        room.getPlayer(playerId).deActivate();
    }

    public sendRoomMessage(roomId: string, message: {text: string, playerId: string }): void {
        const room = this.getRoom(roomId);
        if (!room) return;
        const player = room.getPlayer(message.playerId);
        player.addPoints(message.text.length);
    }

    public getRoomPlayers(roomId: string): Player[] {
        const room = this.getRoom(roomId);
        if (!room) return [];
        return room.getPlayers();
    }
}