import { Worker } from 'bullmq';
import { Resend } from 'resend';
import { EMAIL_QUEUE_NAME, type EmailJobPayload } from './queue';
import { redisConnection } from './redis';







// ─── Worker ───────────────────────────────────────────────────────────────────

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) throw new Error('RESEND_API_KEY is not set');

const resend = new Resend(resendApiKey);

export const emailWorker = new Worker(
  EMAIL_QUEUE_NAME,
  async (job) => {
    const { to, subject, template } = job.data as EmailJobPayload;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html: template,
    });

    console.log('Email sent to:', to);
  },
  {
    connection: redisConnection,
    concurrency: 1,
  },
);

emailWorker.on('completed', (job) => console.log(`Job ${job.id} completed`));
emailWorker.on('failed', (job, err) => console.error('Job failed:', job?.id, err));