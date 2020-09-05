import { getRepository, Repository } from "typeorm";
import { Item } from "../models";
import { IItemInterface } from "../interfaces";

const userRepository = {
  getRepo: (): Repository<Item> => {
    return getRepository(Item);
  },

  listAllItems: async (): Promise<IItemInterface[]> => {
    const repository = userRepository.getRepo();
    const allItems = await repository.find();
    return allItems;
  }
};

export default userRepository;
