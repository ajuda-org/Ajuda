import Knex from "knex";

const createItems = async function seed(knex: Knex) {
  await knex("items").insert([
    { name: "Mercado", image: "market.svg" },
    { name: "Farmácia", image: "drugstore.svg" },
    { name: "Padaria", image: "bakery.svg" },
    { name: "Retirada de lixo", image: "trash.svg" },
    { name: "Máscara / Álcool gel", image: "mask.svg" },
    { name: "Outros", image: "others.svg" }
  ]);
};

export default createItems;
