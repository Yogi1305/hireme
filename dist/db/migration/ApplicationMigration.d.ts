import { MigrationInterface, QueryRunner } from "typeorm";
export declare class ApplicationMigration implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
