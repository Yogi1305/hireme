import { Queue } from 'bullmq';
import { redisConnection } from './redis';





// ─── Queue ────────────────────────────────────────────────────────────────────

export const EMAIL_QUEUE_NAME = 'email-queue';
export const EMAIL_JOB_NAME = 'send-email';

export interface EmailJobPayload {
  to: string;
  subject: string;
  template: string;
}

export const emailQueue = new Queue(EMAIL_QUEUE_NAME, {
  connection: redisConnection,
});

export async function enqueueEmail(payload: EmailJobPayload) {
  return emailQueue.add(EMAIL_JOB_NAME, payload, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 3000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  });
}