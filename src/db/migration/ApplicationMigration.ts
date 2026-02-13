
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ApplicationMigration implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "applications",
				columns: [
					   { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
					   { name: "userId", type: "int" },
					   { name: "jobId", type: "int" },
					   { name: "formId", type: "int" },
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
