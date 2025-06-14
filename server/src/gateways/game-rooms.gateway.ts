import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type { Socket, Server } from 'socket.io';
import { GameRoomsService } from '../services/game-rooms.service';
import { GameRoomEvent } from 'src/enums';

@WebSocketGateway({namespace: 'game-rooms', cors: { origin: '*' }})
export class GameRoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly gameRoomsService: GameRoomsService ){}
  
  @WebSocketServer() private readonly server: Server;
    
  handleConnection(@ConnectedSocket() client: Socket) {
    const {playerId, roomId} = this.getClientQueries(client);
    this.gameRoomsService.connectPlayer(roomId, playerId);

    this.server.emit(GameRoomEvent.PLAYER_JOINED, 'A Player has joined the room '); 

  }

  @SubscribeMessage('players/update')
  public handleUpdate(
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId } = this.getClientQueries(client);    

    this.server.emit(GameRoomEvent.PLAYERS_UPDATE, this.gameRoomsService.getRoomPlayers(roomId));

  }

  @SubscribeMessage('players/message')
  public handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: any,
  ) {
    const { playerId, roomId } = this.getClientQueries(client);
    this.gameRoomsService.sendRoomMessage(roomId, { text: message, playerId });

    this.server.emit(GameRoomEvent.PLAYERS_UPDATE, this.gameRoomsService.getRoomPlayers(roomId));

  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const { playerId, roomId } = this.getClientQueries(client);
    console.log(`Client disconnected: ${playerId} from room: ${roomId}`);

    this.gameRoomsService.disconnectPlayer(roomId, playerId);

    this.server.emit(GameRoomEvent.PLAYER_LEFT, 'A player has left the room');

  }

  private getClientQueries(client: Socket) {
    const playerId = client.handshake.query?.['player'] as string
    const roomId = client.handshake.query?.['room'] as string

    return { playerId, roomId };
  }
  
}