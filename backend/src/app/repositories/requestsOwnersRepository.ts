import { getRepository, Repository, In, Not } from "typeorm";
import { Request } from "../models";

const requestsOwnersRepository = {
  getRepo: (): Repository<Request> => {
    return getRepository(Request);
  },

  listAllByStatus: async (
    ownerId: number,
    status: number
  ): Promise<Request[]> => {
    const repository = requestsOwnersRepository.getRepo();

    const allRequests = await repository.find({
      where: { status, owner_id: ownerId },
      relations: ["owner", "item", "helpers", "helpers.user"]
    });
    return allRequests;
  }
};

export default requestsOwnersRepository;
