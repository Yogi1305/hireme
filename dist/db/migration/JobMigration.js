"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobMigration = void 0;
const typeorm_1 = require("typeorm");
class JobMigration {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "jobs",
            columns: [
                { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
                { name: "title", type: "varchar" },
                { name: "description", type: "varchar" },
                { name: "location", type: "varchar" },
                { name: "salary", type: "int" },
                { name: "companyId", type: "uuid" },
                { name: "jobType", type: "varchar" },
                { name: "jobCategory", type: "varchar" },
                { name: "duration", type: "varchar" },
                { name: "lastDateToApply", type: "timestamp" },
                { name: "isPublic", type: "boolean", default: false },
                { name: "createdAt", type: "timestamp" },
                { name: "updatedAt", type: "timestamp" },
            ],
            foreignKeys: [
                {
                    columnNames: ["companyId"],
                    referencedTableName: "companies",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("jobs");
    }
}
exports.JobMigration = JobMigration;
//# sourceMappingURL=JobMigration.js.map