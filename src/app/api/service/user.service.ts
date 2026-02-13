import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDtoType } from "src/app/zod/user.dto";
import { User } from "src/db/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    constructor() {}

    createUser(user: UserDtoType): Promise<User> {

        return this.userRepository.save(user);
    }

}
