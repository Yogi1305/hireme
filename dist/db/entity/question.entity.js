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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const test_entity_1 = require("./test.entity");
const questionset_entity_1 = require("./questionset.entity");
let Question = class Question extends typeorm_1.BaseEntity {
    id;
    questionText;
    options;
    correctAnswer;
    test;
    questionSet;
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Question.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Question.prototype, "questionText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Question.prototype, "correctAnswer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => test_entity_1.Test, (test) => test.questionSet, { onDelete: 'CASCADE' }),
    __metadata("design:type", test_entity_1.Test)
], Question.prototype, "test", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => questionset_entity_1.QuestionSet, (questionSet) => questionSet.questions, { onDelete: 'CASCADE', nullable: true }),
    __metadata("design:type", questionset_entity_1.QuestionSet)
], Question.prototype, "questionSet", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)({ name: 'questions' })
], Question);
//# sourceMappingURL=question.entity.js.map