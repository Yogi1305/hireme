
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProfileMigration implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "profiles",
				columns: [
					{ name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
					{ name: "github", type: "varchar", isNullable: true },
					{ name: "linkedin", type: "varchar", isNullable: true },
					{ name: "codingProfile", type: "varchar", isNullable: true },
					{ name: "resumeLink", type: "varchar", isNullable: true },
					{ name: "userId", type: "int", isNullable: true },
					{ name: "createdAt", type: "timestamp" },
					{ name: "updatedAt", type: "timestamp" },
				],
				foreignKeys: [
					{
						columnNames: ["userId"],
						referencedTableName: "users",
						referencedColumnNames: ["id"],
						onDelete: "SET NULL",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("profiles");
	}
}
