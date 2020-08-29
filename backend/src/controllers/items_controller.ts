import { Request, Response } from "express";
import knex from "../database/connection";

const itemsController = {
  index: async (req: Request, res: Response): Promise<Response> => {
    const items = await knex("items").select("*");
    const serializedItems = items.map(item => {
      return {
        name: item.name,
        image_url: `http://localhost:3333/uploads/${item.image}`
      };
    });
    return res.json(serializedItems);
  }
};

export default itemsController;
