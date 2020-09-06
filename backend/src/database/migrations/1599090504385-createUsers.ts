import { MigrationInterface, QueryRunner } from "typeorm";

export default class createUsers1599090504385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users ( id SERIAL PRIMARY KEY NOT NULL, name varchar(255) NOT NULL, cpf varchar(14) NOT NULL, whatsapp varchar(15) NOT NULL, type varchar(40) NOT NULL, email varchar(255) NOT NULL UNIQUE, password varchar(255) NOT NULL, created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now() )`,
    );
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  };
};
