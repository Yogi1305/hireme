import { Controller, Get, Param, Patch, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth';
import { NotificationService } from '../service/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  private getUserIdFromRequest(req: Request): string {
    const userId = (req as any).user?.id ?? (req as any).user?.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in token');
    }
    return userId as string;
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyNotifications(@Req() req: Request) {
    const userId = this.getUserIdFromRequest(req);
    const notifications = await this.notificationService.getNotificationsByUser(userId);

    return {
      message: 'Notifications retrieved successfully',
      data: notifications,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':notificationId/mark-as-read')
  async markAsRead(@Param('notificationId') notificationId: string, @Req() req: Request) {
    const userId = this.getUserIdFromRequest(req);
    const deletedNotification = await this.notificationService.markAsRead(notificationId, userId);

    return {
      message: 'Notification marked as read successfully',
      data: deletedNotification,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('mark-all-as-read')
  async markAllAsRead(@Req() req: Request) {
    const userId = this.getUserIdFromRequest(req);
    const deletedCount = await this.notificationService.markAllAsRead(userId);

    return {
      message: 'All notifications marked as read successfully',
      data: { deletedCount },
    };
  }
}