import { MigrationInterface, QueryRunner } from "typeorm";

export class createRequestsItems1599092999278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE requests_items ( id SERIAL PRIMARY KEY NOT NULL, request_id int NOT NULL, item_id int NOT NULL, created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now(), CONSTRAINT fk_request_id FOREIGN KEY(request_id) REFERENCES requests(id), CONSTRAINT fk_item_id FOREIGN KEY(item_id) REFERENCES items(id) )`,
    );
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("requests_items");
  };
};
