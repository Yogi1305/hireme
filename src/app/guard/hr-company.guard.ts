import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { Role } from 'src/db/libs/Role';

@Injectable()
export class HrCompanyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authUser = (request as any).user as { role?: string; companyId?: string } | undefined;

    if (!authUser) {
      throw new UnauthorizedException('Missing authenticated user');
    }

    if (!authUser.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }

    console.log('Authenticated user:', authUser);

    // Allow both ADMIN (company owner) and HR to create jobs
    if (authUser.role !== Role.Hr && authUser.role !== Role.ADMIN) {
        // console.log('Unauthorized role:', authUser.role);
      throw new ForbiddenException('Only HR or Admin can create jobs');
    }

    return true;
  }
}
