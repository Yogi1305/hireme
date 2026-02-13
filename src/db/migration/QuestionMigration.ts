
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class QuestionMigration implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "questions",
				columns: [
					{ name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
					{ name: "questionText", type: "varchar" },
					{ name: "options", type: "simple-array" },
					{ name: "correctAnswer", type: "varchar" },
					{ name: "createdAt", type: "timestamp" },
					{ name: "updatedAt", type: "timestamp" },
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("questions");
	}
}
