import { MigrationInterface, getConnection } from "typeorm";
import { Item } from "../../app/models";

export class seedItems1599266483072 implements MigrationInterface {
  public async up(): Promise<void> {
    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Item)
    .values([
      { name: "Mercado", image: "market.svg" },
      { name: "Farmácia", image: "drugstore.svg" },
      { name: "Padaria", image: "bakery.svg" },
      { name: "Retirada de lixo", image: "trash.svg" },
      { name: "Máscara / Álcool gel", image: "mask.svg" },
      { name: "Outros", image: "others.svg" }
    ])
    .execute();
  };
    
  public async down(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Item)
      .execute();
  };
}