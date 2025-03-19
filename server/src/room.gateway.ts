import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: 'room', cors: { origin: '*' } })
export class RoomGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
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

  handleConnection(@ConnectedSocket() client: Socket) {
    const player =
      client.handshake.query?.['player'] ||
      `player${client.id.substring(0, 5)}`;
    const message = `Client: ${player} has joined the room`;
    console.log(message);
    this.server.emit('player/joined', message);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const player =
      client.handshake.query?.['player'] ||
      `player${client.id.substring(0, 5)}`;
    const message = `Client: ${player} has left the room`;
    console.log(message);
    this.server.emit('player/left', message);
  }
}
