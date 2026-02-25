import { MigrationInterface, QueryRunner } from "typeorm";
export declare class FormMigration implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
