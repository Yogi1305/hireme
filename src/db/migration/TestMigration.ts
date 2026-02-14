
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TestMigration implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "tests",
				columns: [
					{ name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
					{ name: "title", type: "varchar" },
					{ name: "description", type: "varchar" },
					{ name: "jobId", type: "uuid" },
					{ name: "questionSet", type: "simple-array", default: "''" },
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
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("tests");
	}
}
