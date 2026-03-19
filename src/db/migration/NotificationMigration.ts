import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class NotificationMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notifications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'userId', type: 'varchar' },
          { name: 'companyName', type: 'varchar' },
          { name: 'jobTitle', type: 'varchar' },
          { name: 'status', type: 'varchar' },
          { name: 'message', type: 'text' },
          { name: 'isRead', type: 'boolean', default: false },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notifications');
  }
}
