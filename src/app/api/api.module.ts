import { Module } from '@nestjs/common';

import { Service } from './service/service.service';
import { UserService } from './service/user.service';
import { User } from 'src/db/entity/user.entity';
import { Test } from 'src/db/entity/test.entity';
import { Question } from 'src/db/entity/question.entity';
import { Profile } from 'src/db/entity/profile.entity';
import { Form } from 'src/db/entity/form.entity';
import { Job } from 'src/db/entity/jobs.entity';
import { Employee } from 'src/db/entity/employee.entity';
import { Company } from 'src/db/entity/company.entity';
import { Application } from 'src/db/entity/application.entity';
import { UserController } from './controller/user.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guard/jwt.auth';
import { CompanyOwnerController } from './controller/companyowner.controller';
import { CompanyOwnerService } from './service/companyowner.service';
import { EmployeesController } from './controller/employees.controller';
import { EmployeesService } from './service/employees.service';
import { JobController } from './controller/job.controller';
import { JobService } from './service/job.service';
import { HrCompanyGuard } from '../guard/hr-company.guard';
import { FormController } from './controller/form.controller';
import { FormService } from './service/form.service';
import { TestController } from './controller/test.controller';
import { TestService } from './service/test.service';
import { InterviewerCompanyGuard } from '../guard/interviewer-company.guard';
import { QuestionController } from './controller/question.controller';
import { QuestionService } from './service/question.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Use DATABASE_URL
      ssl: { rejectUnauthorized: false }, // Required for Supabase
      autoLoadEntities: true,
      synchronize: true, // dev only
      // logging: true,
      entities: [User,Profile,], // Ensure User entity is included
    })
    ,
    TypeOrmModule.forFeature([
      User,
      Test,
      Question,
      Profile,
      Form,
      Job,
      Employee,
      Company,
      Application
    ]),
    JwtModule.register({
          secret: process.env.JWT_SECRET || 'your_jwt_secret',
          signOptions: { expiresIn: '1d' },
        }),
        
  ],
  controllers: [UserController,CompanyOwnerController,EmployeesController, JobController, FormController, TestController, QuestionController],
  providers: [Service, UserService, JwtAuthGuard,CompanyOwnerService,EmployeesService, JobService, HrCompanyGuard, FormService, TestService, InterviewerCompanyGuard, QuestionService],
  exports: [JwtModule, JwtAuthGuard],
})
export class ApiModule {}
