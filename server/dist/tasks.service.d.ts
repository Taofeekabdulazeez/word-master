import { SchedulerRegistry } from '@nestjs/schedule';
import { RoomGateway } from './gateways/room.gateway';
export declare class TasksService {
    private readonly roomGateway;
    private readonly schedulerRegistry;
    private timer;
    private wordsGame;
    constructor(roomGateway: RoomGateway, schedulerRegistry: SchedulerRegistry);
    startTask(): void;
    notifyRoundWords(): void;
}
