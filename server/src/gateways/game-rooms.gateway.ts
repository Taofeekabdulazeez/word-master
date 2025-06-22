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
import { ClientQueries } from 'src/interfaces';
import { Logger } from '@nestjs/common';
import { MessagePayload } from 'src/types';

@WebSocketGateway({ namespace: 'game-rooms', cors: { origin: '*' } })
export class GameRoomsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly gameRoomsService: GameRoomsService) {}

  private readonly logger: Logger = new Logger();

  @WebSocketServer() private readonly server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    const { playerId, roomId } = GameRoomsGateway.getClientQueries(client);
    this.gameRoomsService.connectPlayer(roomId, playerId);
    this.logger.log(`${playerId} connected to room: ${roomId}`);

    this.server.emit(
      GameRoomEvent.PLAYER_JOINED,
      'A Player has joined the room ',
    );
    this.server.emit(
      GameRoomEvent.PLAYERS_UPDATE,
      this.gameRoomsService.getRoomPlayers(roomId),
    );
  }

  @SubscribeMessage('players/update')
  public handleUpdate(@ConnectedSocket() client: Socket) {
    const { roomId } = GameRoomsGateway.getClientQueries(client);

    this.server.emit(
      GameRoomEvent.PLAYERS_UPDATE,
      this.gameRoomsService.getRoomPlayers(roomId),
    );
  }

  @SubscribeMessage('player/message')
  public handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: MessagePayload,
  ) {
    const { playerId, roomId } = GameRoomsGateway.getClientQueries(client);
    client.broadcast.emit('player/message', message);
    this.gameRoomsService.sendRoomMessage(roomId, {
      text: message.text,
      playerId,
    });

    this.server.emit(
      GameRoomEvent.PLAYERS_UPDATE,
      this.gameRoomsService.getRoomPlayers(roomId),
    );
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const { playerId, roomId } = GameRoomsGateway.getClientQueries(client);
    console.log(`Client disconnected: ${playerId} from room: ${roomId}`);
    this.logger.warn(`${playerId} disconnected from room: ${roomId}`);

    this.gameRoomsService.disconnectPlayer(roomId, playerId);

    this.server.emit(GameRoomEvent.PLAYER_LEFT, 'A player has left the room');
    this.server.emit(
      GameRoomEvent.PLAYERS_UPDATE,
      this.gameRoomsService.getRoomPlayers(roomId),
    );
  }

  private static getClientQueries(client: Socket): ClientQueries {
    const playerId = client.handshake.query?.['player'] as string;
    const roomId = client.handshake.query?.['room'] as string;

    return { playerId, roomId };
  }
}
