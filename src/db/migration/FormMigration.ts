
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class FormMigration implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "form",
				columns: [
					{ name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
					{ name: "form", type: "json" },
					{ name: "jobId", type: "int" },
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
		await queryRunner.dropTable("form");
	}
}
