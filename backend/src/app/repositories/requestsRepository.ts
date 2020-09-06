import { getRepository, Repository, In, Not } from "typeorm";
import { Request, User } from "../models";
import { IRequest } from "../interfaces";

const requestsRepository = {
  getRepo: (): Repository<Request> => {
    return getRepository(Request);
  },

  getUserRepo: (): Repository<User> => {
    return getRepository(User);
  },

  RequestAvaliableById: async (id: string): Promise<Request | undefined> => {
    const repository = requestsRepository.getRepo();
    const requestAvaliable = await repository.findOne({
      id: Number(id),
      status: 0
    });
    return requestAvaliable;
  },

  listAllRequests: async (itemsId: string[]): Promise<Request[]> => {
    const repository = requestsRepository.getRepo();
    let itemsQuery;
    if (itemsId.length > 0) {
      itemsQuery = In(itemsId);
    } else {
      itemsQuery = Not("0");
    }

    const allRequests = await repository.find({
      where: { status: 0, item_id: itemsQuery },
      relations: ["owner", "item"]
    });
    return allRequests;
  },

  showRequestById: async (id: string): Promise<Request | undefined> => {
    const repository = requestsRepository.getRepo();
    const request = await repository.find({
      where: { id: Number(id) },
      relations: ["owner", "item"]
    });
    return request[0];
  },

  userIsHelped: async (userId: string): Promise<boolean> => {
    const repository = requestsRepository.getUserRepo();
    const userExist = await repository.findOne({
      id: Number(userId),
      type: "helped"
    });
    return !!userExist;
  },

  create: async ({
    title,
    description,
    latitude,
    longitude,
    item_id,
    owner_id
  }: IRequest): Promise<Request> => {
    const repository = requestsRepository.getRepo();

    const request = await repository.create({
      title,
      description,
      latitude,
      longitude,
      item_id,
      owner_id
    });

    await repository.save(request);

    return request;
  }
};

export default requestsRepository;
