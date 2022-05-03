import { QueueJobBase } from '@base/infrastructure/abstracts/QueueJobBase';
import { LoggerService } from '@infrastructure/services/logger/LoggerService';
import { Job } from 'bullmq';

export class SendWelcomeMail extends QueueJobBase {
  /**
   * Create a new job instance.
   */
  public constructor(data: any) {
    super(data);
  }

  /**
   * Execute the job.
   */
  public async handle(job: Job) {
    const loggerService = new LoggerService();
    const user = job.data;

    loggerService.info('Recieved job', job.name);
    loggerService.info(user);

    // console.log('Recieved job', job.name);
    // console.log(user);
  }
}
