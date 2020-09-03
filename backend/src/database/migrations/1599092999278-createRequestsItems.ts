import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createRequestsItems1599092999278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "requests_items",
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
            name: "item_id",
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

    await queryRunner.createForeignKey("requests_items", new TableForeignKey({
      columnNames: ["request_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "requests",
      onDelete: "CASCADE"
    }));

    await queryRunner.createForeignKey("requests_items", new TableForeignKey({
      columnNames: ["item_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "items",
      onDelete: "CASCADE"
    }));
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("requests_items");
  };
};
