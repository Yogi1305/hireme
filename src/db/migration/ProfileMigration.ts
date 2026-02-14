import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProfileMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profiles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profiles');
  }
}
