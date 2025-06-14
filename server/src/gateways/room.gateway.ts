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
import { PlayersService } from '../services/players.service';

@WebSocketGateway({ namespace: 'room', cors: { origin: '*' } })
export class RoomGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  constructor(private readonly playersService: PlayersService) {}

  @WebSocketServer() private readonly server: Server;

  public broadCastRoundStarted({ words }: { words: string }) {
    this.server.emit('round/started', { words });
    console.log('round has started');
  }

  public broadCastRoundEnded() {
    this.server.emit('round/ended', 'round has ended');
    console.log('round has ended');
  }

  public broadCastRoundWords(message: string) {
    this.server.emit('round/ended', message);
    console.log(message);
  }

  public broadCastRoundTimer(time: number) {
    this.server.emit('round/timer', time);
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
    const player = client.handshake.query?.['player'] as string;
    client.broadcast.emit('player/message', message);

    this.playersService.updatePlayerPoints(
      player,
      Math.round(message.text.length / 2),
    );

    const players = this.playersService.getPlayers();
    this.server.emit('players/update', players);
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const player = client.handshake.query?.['player'] as string;
    const color = client.handshake.query?.['color'] as string;
    const message = `${player} has joined the room`;
    this.server.emit('player/joined', message);
    this.playersService.addPlayer({ name: player, color });

    const players = this.playersService.getPlayers();
    this.server.emit('players/update', players);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const player = client.handshake.query?.['player'] as string;
    const message = `${player} has left the room`;
    console.log(message);
    this.server.emit('player/left', message);
    // this.playersService.deletePlayer(player);
    this.playersService.makePlayerInActive(player);

    const players = this.playersService.getPlayers();
    this.server.emit('players/update', players);
  }
}
