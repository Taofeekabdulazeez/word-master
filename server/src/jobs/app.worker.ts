import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('round')
export class AppWorker extends WorkerHost {
  async process(job: Job, token?: string) {
    console.log(`Got a new JOB: ${job.id}`);
  }
}
