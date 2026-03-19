import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Notification } from 'src/db/entity/notification.entity';

interface CreateStatusNotificationInput {
  userId: string;
  companyName: string;
  jobTitle: string;
  status: string;
  message?: string;
}

@Injectable()
export class NotificationService {
  async createStatusNotification(input: CreateStatusNotificationInput): Promise<Notification> {
    const message =
      input.message ??
      `Your application status for ${input.jobTitle} at ${input.companyName} is now ${input.status}.`;

    const notification = Notification.create({
      userId: input.userId,
      companyName: input.companyName,
      jobTitle: input.jobTitle,
      status: input.status,
      isRead: false,
      message,
    });
    console.log(
      `Creating notification for user ${input.userId} - Company: ${input.companyName}, Job: ${input.jobTitle}, Status: ${input.status}`,
    );

    return notification.save();
  }

  async markAsRead(notificationId: string, userId: string): Promise<Notification> {
    const notification = await Notification.findOne({ where: { id: notificationId } });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (notification.userId !== userId) {
      throw new ForbiddenException('You can only mark your own notification as read');
    }

    await Notification.delete({ id: notificationId });
    return notification;
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return Notification.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markAllAsRead(userId: string): Promise<number> {
    const result = await Notification.delete({ userId });
    return result.affected ?? 0;
  }
}
