
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class EmployeeMigration implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "employees",
				columns: [
					{ name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
					{ name: "name", type: "varchar" },
					{ name: "email", type: "varchar", isUnique: true },
					{ name: "phone", type: "varchar" },
					{ name: "role", type: "varchar", default: "'USER'" },
					{ name: "companyId", type: "int" },
					{ name: "createdAt", type: "timestamp" },
					{ name: "updatedAt", type: "timestamp" },
				],
				foreignKeys: [
					{
						columnNames: ["companyId"],
						referencedTableName: "companies",
						referencedColumnNames: ["id"],
						onDelete: "CASCADE",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("employees");
	}
}
