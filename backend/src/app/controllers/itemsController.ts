import { Request, Response } from "express";
import { itemsService } from "../services";

const itemsController = {
  index: async (req: Request, res: Response): Promise<Response> => {
    const items = await itemsService.listAll();
    return res.status(200).json(items);
  }
};

export default itemsController;
