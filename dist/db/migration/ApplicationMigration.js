"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationMigration = void 0;
const typeorm_1 = require("typeorm");
class ApplicationMigration {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "applications",
            columns: [
                { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
                { name: "userId", type: "uuid" },
                { name: "jobId", type: "uuid" },
                { name: "formId", type: "uuid" },
                { name: "formResponse", type: "json", isNullable: true },
                { name: "status", type: "varchar", default: "'pending'" },
                { name: "correctedanswers", type: "text", default: "''" },
                { name: "incorrectanswers", type: "text", default: "''" },
                { name: "answerDetails", type: "jsonb", default: "'[]'" },
                { name: "totalquestions", type: "int", default: 0 },
                { name: "testAnswered", type: "boolean", default: false },
                { name: "notes", type: "text", isNullable: true },
                { name: "createdAt", type: "timestamp", default: "now()" },
                { name: "updatedAt", type: "timestamp", default: "now()" },
            ],
            foreignKeys: [
                {
                    columnNames: ["userId"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                },
                {
                    columnNames: ["jobId"],
                    referencedTableName: "jobs",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                },
                {
                    columnNames: ["formId"],
                    referencedTableName: "form",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("applications");
    }
}
exports.ApplicationMigration = ApplicationMigration;
//# sourceMappingURL=ApplicationMigration.js.map