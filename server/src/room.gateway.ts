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
import { PlayersService } from './players.service';

@WebSocketGateway({ namespace: 'room', cors: { origin: '*' } })
export class RoomGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  constructor(private readonly playersService: PlayersService) {}

  @WebSocketServer() private readonly server: Server;

  public broadCastRoundStarted() {
    this.server.emit('round/started', 'round has started');
    console.log('round has started');
  }

  public broadCastRoundEnded() {
    this.server.emit('round/ended', 'round has ended');
    console.log('round has ended');
  }

  public notifyNextRound() {
    this.server.emit(
      'round/pending',
      'The next round will begin in 30 seconds',
    );
    console.log('The next round will begin in 30 seconds');
  }

  public broadCastTimer(time: number) {
    this.server.emit('round/timer', `You have ${time} secs left`);
  }

  @SubscribeMessage('player/message')
  public handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: any,
  ) {
    const player =
      client.handshake.query?.['player'] ||
      `player${client.id.substring(0, 5)}`;
    const msg = `${player}: ${message.text}`;
    console.log(msg);
    client.broadcast.emit('player/message', message); // Emit to all clients except the sender
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const player = client.handshake.query?.['player'] as string;
    const message = `${player} has joined the room`;
    console.log(message);
    this.server.emit('player/joined', message);
    this.playersService.addPlayer(player);

    const players = this.playersService.getPlayers();
    this.server.emit('players/update', players);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const player = client.handshake.query?.['player'] as string;
    const message = `${player} has left the room`;
    console.log(message);
    this.server.emit('player/left', message);
    this.playersService.deletePlayer(player);

    const players = this.playersService.getPlayers();
    this.server.emit('players/update', players);
  }
}
