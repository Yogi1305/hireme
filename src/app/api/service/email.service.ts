import { BadRequestException, Injectable } from '@nestjs/common';
import { enqueueEmail } from 'src/app/redis/queue';

interface QueueEmailInput {
  to: string;
  subject: string;
  template: string;
}

@Injectable()
export class EmailService {
  async sendEmail(input: QueueEmailInput) {
    if (!input?.to || !input?.subject || !input?.template) {
      throw new BadRequestException('to, subject and template are required');
    }

    const job = await enqueueEmail({
      to: input.to,
      subject: input.subject,
      template: input.template,
    });

    return {
      message: 'Email added to queue successfully',
      jobId: job.id,
      queueName: job.queueName,
    };
  }
}