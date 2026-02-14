
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ApplicationMigration implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "applications",
				columns: [
					   { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
					   { name: "userId", type: "uuid" },
					   { name: "jobId", type: "uuid" },
					   { name: "formId", type: "uuid" },
					   { name: "status", type: "varchar", default: "'pending'" },
					   { name: "correctedanswers", type: "int" },
					   { name: "totalquestions", type: "int" },
					   { name: "createdAt", type: "timestamp" },
					   { name: "updatedAt", type: "timestamp" },
				],
				foreignKeys: [
					{
						columnNames: ["userId"],
						referencedTableName: "users",
						referencedColumnNames: ["id"],
						onDelete: "CASCADE",
					},
					{
						columnNames: ["jobId"],
						referencedTableName: "jobs",
						referencedColumnNames: ["id"],
						onDelete: "CASCADE",
					},
					{
						columnNames: ["formId"],
						referencedTableName: "form",
						referencedColumnNames: ["id"],
						onDelete: "CASCADE",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("applications");
	}
}
