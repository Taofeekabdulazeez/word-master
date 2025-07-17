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
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  constructor(private readonly gameRoomsService: GameRoomsService) {}

  private readonly logger: Logger = new Logger(GameRoomsGateway.name);

  @WebSocketServer() private readonly server: Server;

  public async handleConnection(@ConnectedSocket() client: Socket) {
    const { playerId, roomId, color } =
      GameRoomsGateway.getClientQueries(client);
    this.gameRoomsService.connectPlayer(roomId, playerId, color);

    this.logger.log(`${playerId} connected to room: ${roomId}`);

    this.server.emit(
      GameRoomEvent.PLAYER_JOINED,
      `${playerId} has joined the room `,
    );

    const players = this.gameRoomsService.getRoomPlayers(roomId);

    this.server.emit(GameRoomEvent.PLAYERS_UPDATE, players);
  }

  @SubscribeMessage('players/update')
  public async handlePlayersUpdate(@ConnectedSocket() client: Socket) {
    const { roomId } = GameRoomsGateway.getClientQueries(client);

    const players = this.gameRoomsService.getRoomPlayers(roomId);
    this.server.emit(GameRoomEvent.PLAYERS_UPDATE, players);
  }

  @SubscribeMessage('player/message')
  public async handlePlayerMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: MessagePayload,
  ) {
    const { playerId, roomId } = GameRoomsGateway.getClientQueries(client);

    client.broadcast.emit(GameRoomEvent.PLAYERS_MESSAGE, message);

    this.gameRoomsService.sendRoomMessage(roomId, {
      text: message.text,
      playerId,
    });

    const players = this.gameRoomsService.getRoomPlayers(roomId);

    this.server.emit(GameRoomEvent.PLAYERS_UPDATE, players);
  }

  public async handleDisconnect(@ConnectedSocket() client: Socket) {
    const { playerId, roomId } = GameRoomsGateway.getClientQueries(client);

    this.logger.warn(`${playerId} disconnected from room: ${roomId}`);

    this.gameRoomsService.disconnectPlayer(roomId, playerId);

    this.server.emit(
      GameRoomEvent.PLAYER_LEFT,
      `${playerId} has left the room`,
    );

    const players = this.gameRoomsService.getRoomPlayers(roomId);
    this.server.emit(GameRoomEvent.PLAYERS_UPDATE, players);
  }

  private static getClientQueries(client: Socket): ClientQueries {
    const playerId = client.handshake.query?.['player'] as string;
    const roomId = client.handshake.query?.['room'] as string;
    const color = client.handshake.query?.['color'] as string;

    return { playerId, roomId, color };
  }

  public broadcastNewRound() {
    this.gameRoomsService.setNewRounds();
    this.server.emit('round/started', {
      words: this.gameRoomsService.getRoom('1').getWords(),
    });
  }
}
