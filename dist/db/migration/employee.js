"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeMigration = void 0;
const typeorm_1 = require("typeorm");
class EmployeeMigration {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'employees',
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
                    name: 'phone',
                    type: 'varchar',
                    length: '20',
                    isNullable: false,
                },
                {
                    name: 'role',
                    type: 'enum',
                    enum: ['admin', 'user', 'hr', 'interviewer'],
                    default: "'user'",
                },
                {
                    name: 'companyCode',
                    type: 'varchar',
                    length: '6',
                    isNullable: true,
                },
                {
                    name: 'companyId',
                    type: 'uuid',
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
                    columnNames: ['companyId'],
                    referencedTableName: 'companies',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('employees');
    }
}
exports.EmployeeMigration = EmployeeMigration;
//# sourceMappingURL=employee.js.map