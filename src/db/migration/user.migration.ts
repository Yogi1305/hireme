
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "users",
				columns: [
					{ name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
					   { name: "name", type: "varchar", default: "'Unknown'", isNullable: false },
					   { name: "email", type: "varchar", isNullable: false },
					   { name: "password", type: "varchar", isNullable: false },
					   { name: "role", type: "varchar", default: "'user'" },
					{ name: "createdAt", type: "timestamp" },
					{ name: "updatedAt", type: "timestamp" },
					{ name: "profileId", type: "int", isNullable: true },
				],
				foreignKeys: [
					{
						columnNames: ["profileId"],
						referencedTableName: "profiles",
						referencedColumnNames: ["id"],
						onDelete: "SET NULL",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}
}
