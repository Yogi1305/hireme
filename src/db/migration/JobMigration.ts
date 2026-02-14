
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class JobMigration implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "jobs",
				columns: [
					{ name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
					{ name: "title", type: "varchar" },
					{ name: "description", type: "varchar" },
					{ name: "location", type: "varchar" },
					{ name: "salary", type: "int" },
					{ name: "companyId", type: "uuid" },
					{ name: "jobType", type: "varchar" },
					{ name: "jobCategory", type: "varchar" },
					{ name: "duration", type: "varchar" },
					{ name: "lastDateToApply", type: "timestamp" },
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
		await queryRunner.dropTable("jobs");
	}
}
