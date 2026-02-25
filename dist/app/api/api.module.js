"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const service_service_1 = require("./service/service.service");
const user_service_1 = require("./service/user.service");
const user_entity_1 = require("../../db/entity/user.entity");
const test_entity_1 = require("../../db/entity/test.entity");
const question_entity_1 = require("../../db/entity/question.entity");
const profile_entity_1 = require("../../db/entity/profile.entity");
const questionset_entity_1 = require("../../db/entity/questionset.entity");
const form_entity_1 = require("../../db/entity/form.entity");
const jobs_entity_1 = require("../../db/entity/jobs.entity");
const employee_entity_1 = require("../../db/entity/employee.entity");
const company_entity_1 = require("../../db/entity/company.entity");
const application_entity_1 = require("../../db/entity/application.entity");
const user_controller_1 = require("./controller/user.controller");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_1 = require("../guard/jwt.auth");
const companyowner_controller_1 = require("./controller/companyowner.controller");
const companyowner_service_1 = require("./service/companyowner.service");
const employees_controller_1 = require("./controller/employees.controller");
const employees_service_1 = require("./service/employees.service");
const job_controller_1 = require("./controller/job.controller");
const job_service_1 = require("./service/job.service");
const hr_company_guard_1 = require("../guard/hr-company.guard");
const form_controller_1 = require("./controller/form.controller");
const form_service_1 = require("./service/form.service");
const test_controller_1 = require("./controller/test.controller");
const test_service_1 = require("./service/test.service");
const interviewer_company_guard_1 = require("../guard/interviewer-company.guard");
const question_controller_1 = require("./controller/question.controller");
const question_service_1 = require("./service/question.service");
const application_controller_1 = require("./controller/application.controller");
const application_service_1 = require("./service/application.service");
const questionset_controller_1 = require("./controller/questionset.controller");
const questionset_service_1 = require("./service/questionset.service");
const interviewer_controller_1 = require("./controller/interviewer.controller");
const interviewer_service_1 = require("./service/interviewer.service");
let ApiModule = class ApiModule {
};
exports.ApiModule = ApiModule;
exports.ApiModule = ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                ssl: { rejectUnauthorized: false },
                autoLoadEntities: true,
                synchronize: true,
                entities: [user_entity_1.User, profile_entity_1.Profile, questionset_entity_1.QuestionSet, test_entity_1.Test, question_entity_1.Question, form_entity_1.Form, application_entity_1.Application, jobs_entity_1.Job, company_entity_1.Company, employee_entity_1.Employee],
            }),
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                test_entity_1.Test,
                question_entity_1.Question,
                profile_entity_1.Profile,
                form_entity_1.Form,
                jobs_entity_1.Job,
                employee_entity_1.Employee,
                company_entity_1.Company,
                application_entity_1.Application,
                questionset_entity_1.QuestionSet
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'your_jwt_secret',
                signOptions: { expiresIn: '1d' },
            }),
        ],
        controllers: [user_controller_1.UserController, companyowner_controller_1.CompanyOwnerController, employees_controller_1.EmployeesController, job_controller_1.JobController, form_controller_1.FormController, test_controller_1.TestController, question_controller_1.QuestionController, application_controller_1.ApplicationController, interviewer_controller_1.InterviewerController, questionset_controller_1.QuestionSetController],
        providers: [service_service_1.Service, user_service_1.UserService, jwt_auth_1.JwtAuthGuard, companyowner_service_1.CompanyOwnerService, employees_service_1.EmployeesService, job_service_1.JobService, hr_company_guard_1.HrCompanyGuard, form_service_1.FormService, test_service_1.TestService, interviewer_company_guard_1.InterviewerCompanyGuard, question_service_1.QuestionService, application_service_1.ApplicationService, interviewer_service_1.InterviewerService, questionset_service_1.QuestionSetService],
        exports: [jwt_1.JwtModule, jwt_auth_1.JwtAuthGuard],
    })
], ApiModule);
//# sourceMappingURL=api.module.js.map