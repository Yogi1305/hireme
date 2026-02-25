"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMigration = void 0;
const typeorm_1 = require("typeorm");
class UserMigration {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'role',
                    type: 'enum',
                    enum: ['admin', 'user', 'hr', 'interviewer'],
                    default: "'user'",
                },
                {
                    name: 'refreshToken',
                    type: 'varchar',
                    length: '500',
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
                {
                    name: 'profileId',
                    type: 'uuid',
                    isNullable: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['profileId'],
                    referencedTableName: 'profiles',
                    referencedColumnNames: ['id'],
                    onDelete: 'SET NULL',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.UserMigration = UserMigration;
//# sourceMappingURL=user.migration.js.map