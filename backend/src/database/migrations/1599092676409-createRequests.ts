import { MigrationInterface, QueryRunner } from "typeorm";

export class createRequests1599092676409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE requests ( id SERIAL PRIMARY KEY NOT NULL, title varchar(255) NOT NULL, description text NOT NULL, status int NOT NULL DEFAULT 0, latitude varchar(255) NOT NULL, longitude varchar(255) NOT NULL, owner_id int NOT NULL, item_id int NOT NULL, created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now(), CONSTRAINT fk_owner_id FOREIGN KEY(owner_id) REFERENCES users(id), CONSTRAINT fk_item_id FOREIGN KEY(item_id) REFERENCES items(id) )`,
    );
  };
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("requests");
  };
};
