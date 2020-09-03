import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createItems1599092579967 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "items",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false
          },
          {
            name: "image",
            type: "varchar",
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
  };
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("items");
  };
};
