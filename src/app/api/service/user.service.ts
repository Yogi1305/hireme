import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDtoType } from 'src/app/zod/user.dto';
import { User } from 'src/db/entity/user.entity';
import { Profile } from 'src/db/entity/profile.entity';
import { Application } from 'src/db/entity/application.entity';
import { Role } from 'src/db/libs/Role';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    async deleteUser(userId: string): Promise<void> {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');
      await user.remove();
    }

  constructor(private readonly jwtService: JwtService) {}

  // Registration
  async registerUser(dto: CreateUserDtoType): Promise<User> {
    const existing = await User.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = User.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: (dto.role ?? Role.USER) as Role,
    });
    const savedUser = await user.save();
    const profile = Profile.create({
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
    await profile.save();
    return savedUser;
  }

  // Login
  async loginUser(data: { email: string; password: string }): Promise<{ access_token: string, user: User, profile: Profile }> {
    const { email, password } = data;
    const user = await User.findOne({ where: { email } });
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
    const user = await User.findOne({ where: { id } });
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
    const profile = await Profile.findOne({
      where: { user: { id: userId } },
    });
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
    return profile.save();
  }

  // Get all applications for a user
  async getUserApplications(userId: string): Promise<Application[]> {
    if (!userId) {
      throw new UnauthorizedException('Invalid user');
    }
    return Application.find({
      where: { user: { id: userId } },
      relations: ['job', 'job.company', 'form'],
      order: { createdAt: 'DESC' },
    });
  }
}
