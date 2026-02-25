import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ProfileMigration implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
