import { itemsRepository } from "../repositories";

interface IItemWithImageUrl {
  id?: number;
  name: string;
  image_url: string;
}

const itemService = {
  listAll: async (): Promise<IItemWithImageUrl[]> => {
    const items = await itemsRepository.listAllItems();
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        name: item.name,
        image_url: `http://192.168.0.22:3333/uploads/${item.image}`
      };
    });
    return serializedItems;
  }
};

export default itemService;
