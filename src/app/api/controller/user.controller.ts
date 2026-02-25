import { Controller, Get, Post, Body, UseGuards, Req, Res, Delete } from "@nestjs/common";
import { Service } from "../service/service.service";
import { UserService } from "../service/user.service";
import type { CreateUserDtoType } from '../../zod/user.dto';
import { JwtAuthGuard } from "src/app/guard/jwt.auth";
import type { Request } from 'express';
import type { Response } from 'express';
import { Profile } from "src/db/entity/profile.entity";



@Controller("user")
export class UserController {
    constructor(
        private readonly service: Service,
        private readonly userService: UserService
    ) {}
    
    @Post("create")
    async createUser(@Body() user: CreateUserDtoType) {
        return this.userService.registerUser(user);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get("profile")
    getProfile(@Req() req: Request) {
        const userId = (req as any).user?.id as string;
        return this.userService.getProfileByUserId(userId);
    }
    @Post("login")
    async login(
        @Body() data: { email: string; password: string },
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.userService.loginUser(data);

        res.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return { message: 'Login successful' ,data: result};
    }

    @UseGuards(JwtAuthGuard)
    @Post("logout")
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token');
        return { message: 'Logout successful' };
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    getMe(@Req() req: Request) {
        const userId = (req as any).user?.id as string;
        return this.userService.getProfileByUserId(userId);
    }
    @UseGuards(JwtAuthGuard)
    @Post("profile/update")
    async updateProfile(@Req() req: Request, @Body() profileData: Partial<Profile>) {
        const userId = (req as any).user?.id as string;
        return this.userService.updateProfile(userId, profileData);
    }

   
    @Get("service")
    getUserService() {
        return this.service.test(); ;
    }

    @UseGuards(JwtAuthGuard)
    @Get("applications")
    async getUserApplications(@Req() req: Request) {
        const userId = (req as any).user?.id as string;
        return this.userService.getUserApplications(userId);
    }
    @UseGuards(JwtAuthGuard)
    @Delete("delete")
    async deleteUser(@Req() req: Request) {
        const userId = (req as any).user?.id as string;
        return this.userService.deleteUser(userId);
    }
}