import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import type { Socket } from 'socket.io';
import { PlayersService } from './players.service';
export declare class RoomGateway implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
    private readonly playersService;
    constructor(playersService: PlayersService);
    private readonly server;
    broadCastRoundStarted(): void;
    broadCastRoundEnded(): void;
    notifyNextRound(): void;
    broadCastTimer(time: number): void;
    handleMessage(client: Socket, message: any): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
