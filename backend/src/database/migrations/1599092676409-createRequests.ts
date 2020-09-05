import { MigrationInterface, QueryRunner } from "typeorm";

export class createRequests1599092676409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE requests ( id SERIAL PRIMARY KEY NOT NULL, title varchar(255) NOT NULL, description text NOT NULL, status int NOT NULL DEFAULT 0, latitude varchar(255) NOT NULL, longitude varchar(255) NOT NULL, created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now() )`,
    );
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("requests");
  };
};
