"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMigration = void 0;
const typeorm_1 = require("typeorm");
class TestMigration {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "tests",
            columns: [
                { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
                { name: "title", type: "varchar" },
                { name: "description", type: "varchar" },
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
        await queryRunner.dropTable("tests");
    }
}
exports.TestMigration = TestMigration;
//# sourceMappingURL=TestMigration.js.map