"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const application_entity_1 = require("../../../db/entity/application.entity");
const jobs_entity_1 = require("../../../db/entity/jobs.entity");
const form_entity_1 = require("../../../db/entity/form.entity");
const test_entity_1 = require("../../../db/entity/test.entity");
const user_entity_1 = require("../../../db/entity/user.entity");
const company_entity_1 = require("../../../db/entity/company.entity");
const profile_entity_1 = require("../../../db/entity/profile.entity");
let ApplicationService = class ApplicationService {
    async createApplication(dto, auth) {
        if (!dto) {
            throw new common_1.BadRequestException('Request body is required');
        }
        if (!auth?.userId) {
            throw new common_1.UnauthorizedException('User ID not found in token');
        }
        const user = await user_entity_1.User.findOne({ where: { id: auth.userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const job = await jobs_entity_1.Job.findOne({ where: { id: dto.jobId } });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (!job.isPublic) {
            throw new common_1.ForbiddenException('Job is not public');
        }
        const now = new Date();
        if (job.lastDateToApply && now > job.lastDateToApply) {
            throw new common_1.ConflictException('Job application period has ended');
        }
        const existingApplication = await application_entity_1.Application.createQueryBuilder('application')
            .leftJoin('application.user', 'user')
            .leftJoin('application.job', 'job')
            .where('user.id = :userId', { userId: auth.userId })
            .andWhere('job.id = :jobId', { jobId: dto.jobId })
            .getOne();
        if (existingApplication) {
            throw new common_1.ConflictException('You have already applied for this job');
        }
        const form = await form_entity_1.Form.createQueryBuilder('form')
            .leftJoinAndSelect('form.job', 'job')
            .where('job.id = :jobId', { jobId: dto.jobId })
            .getOne();
        if (!form) {
            throw new common_1.NotFoundException('Form not found for this job');
        }
        let correctedAnswerIds = [];
        let incorrectAnswerIds = [];
        let answerDetails = [];
        let totalQuestions = 0;
        let testAnswered = false;
        if (dto.testAnswers && dto.testAnswers.length > 0) {
            const test = await test_entity_1.Test.createQueryBuilder('test')
                .leftJoinAndSelect('test.job', 'job')
                .leftJoinAndSelect('test.questionSet', 'questionSet')
                .where('job.id = :jobId', { jobId: dto.jobId })
                .getOne();
            if (test && test.questionSet && test.questionSet.length > 0) {
                totalQuestions = test.questionSet.length;
                testAnswered = true;
                for (const answer of dto.testAnswers) {
                    const question = test.questionSet.find(q => q.id === answer.questionId);
                    if (question) {
                        const isCorrect = question.correctAnswer === answer.answer;
                        answerDetails.push({
                            questionId: answer.questionId,
                            userAnswer: answer.answer,
                            correctAnswer: question.correctAnswer,
                            isCorrect,
                        });
                        if (isCorrect) {
                            correctedAnswerIds.push(answer.questionId);
                        }
                        else {
                            incorrectAnswerIds.push(answer.questionId);
                        }
                    }
                }
            }
        }
        const application = application_entity_1.Application.create({
            user,
            job,
            form,
            formResponse: dto.formResponse,
            status: 'pending',
            correctedanswers: correctedAnswerIds,
            incorrectanswers: incorrectAnswerIds,
            answerDetails,
            totalquestions: totalQuestions,
            testAnswered,
        });
        return application.save();
    }
    async getMyApplications(auth) {
        if (!auth?.userId) {
            throw new common_1.UnauthorizedException('User ID not found in token');
        }
        const applications = await application_entity_1.Application.createQueryBuilder('application')
            .leftJoinAndSelect('application.job', 'job')
            .leftJoinAndSelect('job.company', 'company')
            .leftJoin('application.user', 'user')
            .where('user.id = :userId', { userId: auth.userId })
            .getMany();
        return applications;
    }
    async getApplicationsByJob(jobId, auth) {
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const job = await jobs_entity_1.Job.createQueryBuilder('job')
            .leftJoinAndSelect('job.company', 'company')
            .where('job.id = :jobId', { jobId })
            .getOne();
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can only view applications for your company jobs');
        }
        const applications = await application_entity_1.Application.createQueryBuilder('application')
            .leftJoinAndSelect('application.user', 'user')
            .leftJoinAndSelect('user.profile', 'profile')
            .leftJoinAndSelect('application.job', 'job')
            .where('job.id = :jobId', { jobId })
            .getMany();
        return applications.map(app => {
            if (app.user) {
                delete app.user.password;
                delete app.user.refreshToken;
            }
            return app;
        });
    }
    async updateApplicationStatus(applicationId, status, notes, auth) {
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const application = await application_entity_1.Application.createQueryBuilder('application')
            .leftJoinAndSelect('application.job', 'job')
            .leftJoinAndSelect('job.company', 'company')
            .where('application.id = :applicationId', { applicationId })
            .getOne();
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (application.job?.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can only update applications for your company jobs');
        }
        application.status = status;
        if (notes !== undefined) {
            application.notes = notes;
        }
        return application.save();
    }
    async getApplicationById(applicationId, auth) {
        const application = await application_entity_1.Application.createQueryBuilder('application')
            .leftJoinAndSelect('application.user', 'user')
            .leftJoinAndSelect('user.profile', 'profile')
            .leftJoinAndSelect('application.job', 'job')
            .leftJoinAndSelect('job.company', 'company')
            .leftJoinAndSelect('application.form', 'form')
            .where('application.id = :applicationId', { applicationId })
            .getOne();
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        const isApplicant = application.user?.id === auth.userId;
        const isCompany = application.job?.company?.id === auth.companyId;
        if (!isApplicant && !isCompany) {
            throw new common_1.ForbiddenException('You do not have access to this application');
        }
        if (application.user) {
            delete application.user.password;
            delete application.user.refreshToken;
        }
        return application;
    }
    async getQuestionsByTestId(testId) {
        const test = await test_entity_1.Test.findOne({
            where: { id: testId },
            relations: ['questionSet'],
        });
        if (!test) {
            throw new common_1.NotFoundException('Test not found');
        }
        if (!test.questionSet || test.questionSet.length === 0) {
            return [];
        }
        return test.questionSet.map(q => ({
            id: q.id,
            questionText: q.questionText,
            options: q.options,
        }));
    }
    async submitTestAnswers(applicationId, testAnswers, auth) {
        if (!auth?.userId) {
            throw new common_1.UnauthorizedException('User ID not found in token');
        }
        const application = await application_entity_1.Application.createQueryBuilder('application')
            .leftJoinAndSelect('application.user', 'user')
            .leftJoinAndSelect('application.job', 'job')
            .where('application.id = :applicationId', { applicationId })
            .getOne();
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (application.user?.id !== auth.userId) {
            throw new common_1.ForbiddenException('You can only submit answers for your own application');
        }
        const test = await test_entity_1.Test.createQueryBuilder('test')
            .leftJoinAndSelect('test.job', 'job')
            .leftJoinAndSelect('test.questionSet', 'questionSet')
            .where('job.id = :jobId', { jobId: application.job?.id })
            .getOne();
        if (!test) {
            throw new common_1.NotFoundException('Test not found for this job');
        }
        const alreadyAnsweredIds = [
            ...(Array.isArray(application.correctedanswers) ? application.correctedanswers : []),
            ...(Array.isArray(application.incorrectanswers) ? application.incorrectanswers : [])
        ];
        const duplicate = testAnswers.find(ans => alreadyAnsweredIds.includes(ans.questionId));
        if (duplicate) {
            throw new common_1.ConflictException(`Question ${duplicate.questionId} has already been answered`);
        }
        for (const answer of testAnswers) {
            const alreadyAnswered = application.answerDetails?.some((a) => a.questionId === answer.questionId);
            if (alreadyAnswered) {
                throw new common_1.ConflictException(`Question ${answer.questionId} has already been answered`);
            }
            const question = test.questionSet.find(q => q.id === answer.questionId);
            if (question) {
                const isCorrect = question.correctAnswer === answer.answer;
                application.answerDetails.push({
                    questionId: answer.questionId,
                    userAnswer: answer.answer,
                    correctAnswer: question.correctAnswer,
                    isCorrect,
                });
                if (isCorrect) {
                    application.correctedanswers.push(answer.questionId);
                }
                else {
                    application.incorrectanswers.push(answer.questionId);
                }
            }
        }
        application.totalquestions = test.questionSet.length;
        application.testAnswered = true;
        return application.save();
    }
    async getJobsWithApplicantsByCompany(companyId) {
        if (!companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const company = await company_entity_1.Company.findOne({ where: { id: companyId } });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        const jobs = await jobs_entity_1.Job.createQueryBuilder('job')
            .leftJoinAndSelect('job.company', 'company')
            .leftJoinAndSelect('job.test', 'test')
            .leftJoinAndSelect('job.Form', 'form')
            .where('company.id = :companyId', { companyId: company.id })
            .getMany();
        const jobsWithApplicants = await Promise.all(jobs.map(async (job) => {
            const applications = await application_entity_1.Application.createQueryBuilder('application')
                .leftJoinAndSelect('application.user', 'user')
                .leftJoinAndSelect('application.form', 'form')
                .where('application.jobId = :jobId', { jobId: job.id })
                .select([
                'application.id',
                'application.status',
                'application.formResponse',
                'application.correctedanswers',
                'application.incorrectanswers',
                'application.totalquestions',
                'application.testAnswered',
                'application.createdAt',
                'user.id',
                'user.name',
                'user.email',
            ])
                .getMany();
            const applicantsWithProfiles = await Promise.all(applications.map(async (app) => {
                let profile = null;
                if (app.user?.id) {
                    profile = await profile_entity_1.Profile.createQueryBuilder('profile')
                        .leftJoin('profile.user', 'user')
                        .where('user.id = :userId', { userId: app.user.id })
                        .select(['profile.github', 'profile.linkedin', 'profile.skills', 'profile.resumes'])
                        .getOne();
                }
                return {
                    applicationId: app.id,
                    status: app.status,
                    formResponse: app.formResponse,
                    testScore: app.testAnswered
                        ? `${app.correctedanswers?.length || 0}/${app.totalquestions}`
                        : 'Not taken',
                    correctAnswers: app.correctedanswers?.length || 0,
                    incorrectAnswers: app.incorrectanswers?.length || 0,
                    appliedAt: app.createdAt,
                    user: app.user
                        ? {
                            id: app.user.id,
                            name: app.user.name,
                            email: app.user.email,
                            profile,
                        }
                        : null,
                };
            }));
            return {
                ...job,
                applicantCount: applications.length,
                applicants: applicantsWithProfiles,
            };
        }));
        return { jobs: jobsWithApplicants };
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)()
], ApplicationService);
//# sourceMappingURL=application.service.js.map