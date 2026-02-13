
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CompanyMigration implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "companies",
				columns: [
					{ name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
					{ name: "CompanyName", type: "varchar" },
					{ name: "Location", type: "varchar" },
					{ name: "Industry", type: "varchar" },
					{ name: "Website", type: "varchar" },
					{ name: "Email", type: "varchar" },
					{ name: "Phone", type: "varchar" },
					{ name: "Roles", type: "varchar", default: "'ADMIN'" },
					{ name: "CreatedAt", type: "timestamp" },
					{ name: "UpdatedAt", type: "timestamp" },
					{ name: "CompanyCode", type: "varchar", length: "6", isUnique: true },
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("companies");
	}
}
