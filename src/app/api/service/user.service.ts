import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDtoType } from 'src/app/zod/user.dto';
import { User } from 'src/db/entity/user.entity';
import { Profile } from 'src/db/entity/profile.entity';
import { Application } from 'src/db/entity/application.entity';
import { Role } from 'src/db/libs/Role';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Profile)
  private readonly profileRepository: Repository<Profile>;

  @InjectRepository(Application)
  private readonly applicationRepository: Repository<Application>;

  constructor(private readonly jwtService: JwtService) {}

  // Registration
  async registerUser(dto: CreateUserDtoType): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    return this.userRepository.manager.transaction(async (entityManager) => {
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = entityManager.create(User, {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: (dto.role ?? Role.USER) as Role,
      });

      const savedUser = await entityManager.save(User, user);

      const profile = entityManager.create(Profile, {
        github: null,
        linkedin: null,
        codingProfiles: null,
        resumes: null,
        primaryResumeIndex: 0,
        skills: null,
        education: [],
        experiences: [],
        user: savedUser,
      });

      await entityManager.save(Profile, profile);

      return savedUser;
    });
  }

  // Login
  async loginUser(data: { email: string; password: string }): Promise<{ access_token: string, user: User, profile: Profile }> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { id: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);
    const profile = await this.getProfileByUserId(user.id);
    return { access_token, user, profile };
  }

  // Get user by id
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Get profile by user id
  async getProfileByUserId(userId: string): Promise<Profile> {
    if (!userId) {
      throw new UnauthorizedException('Invalid user');
    }

    const profile = await this.profileRepository
      .createQueryBuilder('profile')
      .leftJoin('profile.user', 'user')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }
  // update profile
  async updateProfile(userId: string, profileData: Partial<Profile>): Promise<Profile> {
    const profile = await this.getProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    if (profileData.skills) {
      profileData.skills = profileData.skills.map(skill => skill.trim());
    }
    if (profileData.resumes) {
      // upload the resumes to s3 and replace the local paths with s3 urls
      
    }
    Object.assign(profile, profileData);
    return this.profileRepository.save(profile);
  }

  // Get all applications for a user
  async getUserApplications(userId: string): Promise<Application[]> {
    if (!userId) {
      throw new UnauthorizedException('Invalid user');
    }

    const applications = await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.job', 'job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('application.form', 'form')
      .leftJoin('application.user', 'user')
      .where('user.id = :userId', { userId })
      .select([
        'application.id',
        'application.status',
        'application.formResponse',
        'application.testAnswered',
        'application.totalquestions',
        'application.correctedanswers',
        'application.incorrectanswers',
        'application.createdAt',
        'application.updatedAt',
        'job.id',
        'job.title',
        'job.description',
        'job.location',
        'job.salary',
        'job.jobType',
        'job.jobCategory',
        'job.lastDateToApply',
        'company.id',
        'company.companyName',
        'form.id',
      ])
      .orderBy('application.createdAt', 'DESC')
      .getMany();

    return applications;
  }
}
