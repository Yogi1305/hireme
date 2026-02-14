import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDtoType } from 'src/app/zod/user.dto';
import { User } from 'src/db/entity/user.entity';
import { Role } from 'src/db/libs/Role';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async createUser(dto: CreateUserDtoType): Promise<User> {
    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: (dto.role ?? 'user') as Role,
    });
    return this.userRepository.save(user);
  }
}
