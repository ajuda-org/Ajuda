import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRequests1599092676409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "requests",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false
          },
          {
            name: "status",
            type: "int",
            isNullable: false
          },
          {
            name: "latitude",
            type: "varchar",
            isNullable: false
          },
          {
            name: "longitude",
            type: "varchar",
            isNullable: false,
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
    await queryRunner.dropTable("requests");
  };
};
