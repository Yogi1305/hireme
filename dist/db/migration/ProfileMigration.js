"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileMigration = void 0;
const typeorm_1 = require("typeorm");
class ProfileMigration {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'profiles',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'userId',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'github',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'linkedin',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'codingProfiles',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'resumes',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'primaryResumeIndex',
                    type: 'int',
                    isNullable: true,
                    default: 0,
                },
                {
                    name: 'skills',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'education',
                    type: 'jsonb',
                    isNullable: true,
                    default: "'[]'",
                },
                {
                    name: 'experiences',
                    type: 'jsonb',
                    isNullable: true,
                    default: "'[]'",
                },
                {
                    name: 'userId',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['userId'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onDelete: 'SET NULL',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('profiles');
    }
}
exports.ProfileMigration = ProfileMigration;
//# sourceMappingURL=ProfileMigration.js.map