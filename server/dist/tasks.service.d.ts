import { SchedulerRegistry } from '@nestjs/schedule';
import { RoomGateway } from './room.gateway';
export declare class TasksService {
    private readonly roomGateway;
    private readonly schedulerRegistry;
    private timer;
    constructor(roomGateway: RoomGateway, schedulerRegistry: SchedulerRegistry);
    startTask(): void;
}
