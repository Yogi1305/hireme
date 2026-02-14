import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	private getTokenFromCookie(cookieHeader?: string): string | null {
		if (!cookieHeader) return null;
		const cookies = cookieHeader.split(';');
		for (const cookie of cookies) {
			const [name, ...valueParts] = cookie.trim().split('=');
			if (name === 'access_token') {
				return decodeURIComponent(valueParts.join('='));
			}
		}
		return null;
	}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>();
		const authHeader = request.headers['authorization'];
		const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
		const tokenFromCookie = this.getTokenFromCookie(request.headers['cookie']);
		const token = tokenFromHeader || tokenFromCookie;

		if (!token) {
			throw new UnauthorizedException('Missing token');
		}
		try {
			const payload = this.jwtService.verify(token);
			if (!payload || !payload.id || !payload.role) {
				throw new UnauthorizedException('Invalid token payload');
			}
			// Attach user info to request for further use
			(request as any).user = { id: payload.id, role: payload.role };
			return true;
		} catch (err) {
			throw new UnauthorizedException('Invalid or expired token');
		}
	}
}
