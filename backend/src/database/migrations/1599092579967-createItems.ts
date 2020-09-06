import { MigrationInterface, QueryRunner } from "typeorm";

export class createItems1599092579967 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE items ( id SERIAL PRIMARY KEY NOT NULL, name varchar(255) NOT NULL, image varchar(255) NOT NULL, created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now() )`,
    );
  };
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("items");
  };
};
