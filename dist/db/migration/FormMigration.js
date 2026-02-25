"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormMigration = void 0;
const typeorm_1 = require("typeorm");
class FormMigration {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "form",
            columns: [
                { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
                { name: "form", type: "json" },
                { name: "jobId", type: "uuid" },
                { name: "createdAt", type: "timestamp" },
                { name: "updatedAt", type: "timestamp" },
            ],
            foreignKeys: [
                {
                    columnNames: ["jobId"],
                    referencedTableName: "jobs",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("form");
    }
}
exports.FormMigration = FormMigration;
//# sourceMappingURL=FormMigration.js.map