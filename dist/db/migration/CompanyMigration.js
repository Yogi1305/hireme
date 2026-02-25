"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyMigration = void 0;
const typeorm_1 = require("typeorm");
class CompanyMigration {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'companies',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'companyName',
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
                    name: 'refreshToken',
                    type: 'varchar',
                    length: '500',
                    isNullable: true,
                },
                {
                    name: 'location',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'industry',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'website',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    length: '20',
                    isNullable: true,
                },
                {
                    name: 'companyCode',
                    type: 'varchar',
                    length: '6',
                    isUnique: true,
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('companies');
    }
}
exports.CompanyMigration = CompanyMigration;
//# sourceMappingURL=CompanyMigration.js.map