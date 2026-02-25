"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const questionset_entity_1 = require("../../../db/entity/questionset.entity");
const question_entity_1 = require("../../../db/entity/question.entity");
let QuestionSetService = class QuestionSetService {
    questionSetRepository;
    questionRepository;
    async deleteQuestionSet(questionSetId) {
        const set = await this.questionSetRepository.findOne({ where: { id: questionSetId } });
        if (!set)
            throw new common_1.NotFoundException('Question set not found');
        await this.questionSetRepository.delete(questionSetId);
    }
    constructor(questionSetRepository, questionRepository) {
        this.questionSetRepository = questionSetRepository;
        this.questionRepository = questionRepository;
    }
    async createQuestionSet(setName) {
        const questionSet = this.questionSetRepository.create({ setName });
        return this.questionSetRepository.save(questionSet);
    }
    async addQuestionToSet(questionSetId, questionData) {
        const questionSet = await this.questionSetRepository.findOne({ where: { id: questionSetId } });
        if (!questionSet)
            throw new common_1.NotFoundException('Question set not found');
        const question = this.questionRepository.create({ ...questionData, questionSet });
        return this.questionRepository.save(question);
    }
    async deleteQuestionFromSet(questionId) {
        await this.questionRepository.delete(questionId);
    }
    async getQuestionSetWithQuestions(id) {
        const set = await this.questionSetRepository.findOne({ where: { id }, relations: ['questions'] });
        if (!set)
            throw new common_1.NotFoundException('Question set not found');
        return set;
    }
    async getAllQuestionSetsWithQuestions() {
        return this.questionSetRepository.find({ relations: ['questions'] });
    }
};
exports.QuestionSetService = QuestionSetService;
exports.QuestionSetService = QuestionSetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(questionset_entity_1.QuestionSet)),
    __param(1, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], QuestionSetService);
//# sourceMappingURL=questionset.service.js.map