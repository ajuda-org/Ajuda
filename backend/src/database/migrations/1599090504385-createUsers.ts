import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class createUsers1599090504385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
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
            name: "cpf",
            type: "varchar",
            isNullable: false
          },
          {
            name: "whatsapp",
            type: "varchar",
            isNullable: false
          },
          {
            name: "type",
            type: "varchar",
            isNullable: false
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
            isUnique: true
          },
          {
            name: "password",
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
    await queryRunner.dropTable("users");
  };
};
