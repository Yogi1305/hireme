import { Controller, Get, Post, Body } from "@nestjs/common";
import { Service } from "../service/service.service";
import { UserService } from "../service/user.service";
import type { CreateUserDtoType } from '../../zod/user.dto';



@Controller("user")
export class UserController {
    constructor(
        private readonly service: Service,
        private readonly userService: UserService
    ) {}
    @Post("create")
    async createUser(@Body() user: CreateUserDtoType) {
        return this.userService.createUser(user);
    }

    @Get()
    getUser() {
        return "Hello World";
    }

    @Get("service")
    getUserService() {
        return this.service.test(); ;
    }
}