import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { Role } from 'src/db/libs/Role';

@Injectable()
export class InterviewerCompanyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authUser = (request as any).user as { role?: string; companyId?: string } | undefined;

    if (!authUser) {
      throw new UnauthorizedException('Missing authenticated user');
    }

    if (!authUser.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }

    if (authUser.role !== Role.Interviewer && authUser.role !== Role.ADMIN) {
      throw new ForbiddenException('Only interviewer can create test and questions');
    }

    return true;
  }
}
