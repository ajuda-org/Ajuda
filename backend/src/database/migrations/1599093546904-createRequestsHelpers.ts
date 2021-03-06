import { MigrationInterface, QueryRunner } from "typeorm";

export class createRequestsHelpers1599093546904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE requests_helpers ( id SERIAL PRIMARY KEY NOT NULL, request_id int NOT NULL, user_id int NOT NULL, status int NOT NULL DEFAULT 0,created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now(), CONSTRAINT fk_request_id FOREIGN KEY(request_id) REFERENCES requests(id), CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id) )`,
    );
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("requests_helpers");
  };
};
