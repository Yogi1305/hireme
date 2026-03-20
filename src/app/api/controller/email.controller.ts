import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from '../service/email.service';

interface QueueEmailRequest {
  to: string;
  subject: string;
  template: string;
}

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() body: QueueEmailRequest) {
    return this.emailService.sendEmail(body);
  }
}