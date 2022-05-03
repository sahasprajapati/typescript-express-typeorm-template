import { env } from '@utils/env';

export const queueConfig = {
  concurrency: parseInt(env('QUEUE_CONCURRENCY', '1')),
  queueName: env('QUEUE_NAME', 'mailbot'),
  limiter: {
    max: parseInt(env('QUEUE_LIMITER_MAX', '1')),
    duration: parseInt(env('QUEUE_LIMITER_DURATION', '1000'))
  }
};
