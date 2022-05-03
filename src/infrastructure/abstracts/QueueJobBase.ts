import { dbConfig } from '@config/db';
import { queueConfig } from '@config/queue';
import { LoggerService } from '@infrastructure/services/logger/LoggerService';
import {
  Queue,
  Worker,
  Processor,
  QueueScheduler,
  QueueEvents,
  JobsOptions
} from 'bullmq';

export abstract class QueueJobBase {
  private queue: Queue;
  private queueScheduler: QueueScheduler;
  private queueEvents: QueueEvents;
  private readonly jobName: string = (<any>this).constructor.name;
  private jobOptions: JobsOptions;
  private data: any;

  abstract handle(job: any): Promise<Processor<any, any, string>> | any;

  public constructor(data: any) {
    this.data = data;
  }
  public process() {
    this.queueScheduler = new QueueScheduler(this.jobName, {
      connection: dbConfig.redis
    });
    this.queueEvents = new QueueEvents(this.jobName, {
      connection: dbConfig.redis
    });

    this.queue = new Queue(this.jobName, { connection: dbConfig.redis });

    this.queue.add(this.jobName, this.data, this.jobOptions);
    const worker = new Worker(this.jobName, this.handle, {
      connection: dbConfig.redis,
      concurrency: queueConfig.concurrency,
      limiter: queueConfig.limiter
    });

    worker.on('completed', this.onCompleted);
    worker.on('failed', this.onFailed);
  }
  public setOptions(jobOptions: JobsOptions): this {
    this.jobOptions = jobOptions;

    return this;
  }

  public dispatch() {
    this.process();
  }
  public onCompleted(job: any): any {
    //
  }
  public onFailed(job: any): any {
    //
  }
}
