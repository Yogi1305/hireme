// import { Controller, Get, Req, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from '../service/auth.service';

// @Controller('auth')
// export class AuthController {
// 	constructor(private readonly authService: AuthService) {}

// 	@Get('google')
// 	@UseGuards(AuthGuard('google'))
// 	async googleAuth(@Req() req) {}

// 	@Get('google/callback')
// 	@UseGuards(AuthGuard('google'))
// 	async googleAuthRedirect(@Req() req) {
// 		// req.user contains Google profile
// 		return this.authService.handleGoogleLogin(req.user);
// 	}
// }
