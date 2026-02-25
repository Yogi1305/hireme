
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class QuestionMigration implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "questions",
				columns: [
					{ name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
					{ name: "questionText", type: "varchar" },
					{ name: "options", type: "simple-array" },
					{ name: "correctAnswer", type: "varchar" },
					{ name: "testId", type: "uuid", isNullable: true },
					{ name: "questionSetId", type: "uuid", isNullable: true },
					{ name: "createdAt", type: "timestamp" },
					{ name: "updatedAt", type: "timestamp" },
				],
				foreignKeys: [
					{
						columnNames: ["testId"],
						referencedTableName: "tests",
						referencedColumnNames: ["id"],
						onDelete: "CASCADE",
					},
					{
						columnNames: ["questionSetId"],
						referencedTableName: "question_sets",
						referencedColumnNames: ["id"],
						onDelete: "CASCADE",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("questions");
	}
}
