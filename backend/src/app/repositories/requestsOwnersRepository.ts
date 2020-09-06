import { getRepository, Repository, In, Not } from "typeorm";
import { Request } from "../models";

const requestsOwnersRepository = {
  getRepo: (): Repository<Request> => {
    return getRepository(Request);
  },

  listAllByStatus: async (
    ownerId: string,
    status: string[]
  ): Promise<Request[]> => {
    const repository = requestsOwnersRepository.getRepo();
    let statusQuery;
    if (status.length > 0) {
      statusQuery = In(status);
    } else {
      statusQuery = Not("9999");
    }
    const allRequests = await repository.find({
      where: { status: statusQuery, owner_id: ownerId },
      relations: ["owner", "item", "helpers", "helpers.user"]
    });
    return allRequests;
  }
};

export default requestsOwnersRepository;
