import { getRepository, Repository, In, Not, UpdateResult } from "typeorm";
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

  RequestAvaliableByIdAndOwner: async (
    id: string,
    ownerId: string
  ): Promise<Request | undefined> => {
    const repository = requestsRepository.getRepo();
    const requestAvaliable = await repository.findOne({
      id: Number(id),
      owner_id: Number(ownerId),
      status: 0
    });
    return requestAvaliable;
  },

  listAllRequests: async (itemsId: number[]): Promise<Request[]> => {
    const repository = requestsRepository.getRepo();
    const allRequests = await repository.find({
      where: { status: 0, item_id: In(itemsId) },
      relations: ["owner", "item"]
    });

    return allRequests;
  },

  showRequestById: async (id: string): Promise<Request | undefined> => {
    const repository = requestsRepository.getRepo();
    const request = await repository.find({
      where: { id: Number(id) },
      relations: ["owner", "item", "helpers", "helpers.user"]
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
      item_id: Number(item_id),
      owner_id: Number(owner_id)
    });

    await repository.save(request);

    return request;
  },

  update: async (requestId: string): Promise<UpdateResult> => {
    const repository = requestsRepository.getRepo();
    const updatedRequest = await repository.update(requestId, {
      status: 1
    });
    return updatedRequest;
  }
};

export default requestsRepository;
