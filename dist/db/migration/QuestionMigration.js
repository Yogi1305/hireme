"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionMigration = void 0;
const typeorm_1 = require("typeorm");
class QuestionMigration {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "questions",
            columns: [
                { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
                { name: "questionText", type: "varchar" },
                { name: "options", type: "simple-array" },
                { name: "correctAnswer", type: "varchar" },
                { name: "testId", type: "uuid", isNullable: true },
                { name: "questionSetId", type: "uuid", isNullable: true },
                { name: "createdAt", type: "timestamp" },
                { name: "updatedAt", type: "timestamp" },
            ],
            foreignKeys: [
                {
                    columnNames: ["testId"],
                    referencedTableName: "tests",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                },
                {
                    columnNames: ["questionSetId"],
                    referencedTableName: "question_sets",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("questions");
    }
}
exports.QuestionMigration = QuestionMigration;
//# sourceMappingURL=QuestionMigration.js.map