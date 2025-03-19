import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import type { Socket } from 'socket.io';
export declare class RoomGateway implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
    private readonly server;
    broadCastRoundStarted(): void;
    broadCastRoundEnded(): void;
    notifyNextRound(): void;
    broadCastTimer(time: number): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
