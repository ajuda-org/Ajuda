import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createRequestsHelpers1599093546904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "requests_helpers",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true
          },
          {
            name: "request_id",
            type: "int",
            isNullable: false
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    );

    await queryRunner.createForeignKey("requests_helpers", new TableForeignKey({
      columnNames: ["request_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "requests",
      onDelete: "CASCADE"
    }));

    await queryRunner.createForeignKey("requests_helpers", new TableForeignKey({
      columnNames: ["user_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE"
    }));
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("requests_helpers");
  };
};
