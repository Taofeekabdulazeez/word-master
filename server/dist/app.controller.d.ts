import { AppService } from './app.service';
import { Queue } from 'bullmq';
export declare class AppController {
    private readonly appService;
    private readonly roundQueue;
    constructor(appService: AppService, roundQueue: Queue);
    newRound(): Promise<{
        message: string;
    }>;
    getHello(): string;
}
