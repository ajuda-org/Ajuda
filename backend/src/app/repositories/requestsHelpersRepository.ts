import { getRepository, Repository, In, Not } from "typeorm";
import { RequestHelper } from "../models";

interface IHelpers {
  requestId: string;
  userId: string;
}

const requestsHelpersRepository = {
  getRepo: (): Repository<RequestHelper> => {
    return getRepository(RequestHelper);
  },

  listAllByStatus: async (
    userId: string,
    status: string[]
  ): Promise<RequestHelper[]> => {
    const repository = requestsHelpersRepository.getRepo();
    let statusQuery;
    if (status.length > 0) {
      statusQuery = In(status);
    } else {
      statusQuery = Not("9999");
    }
    const allRequests = await repository.find({
      where: { status: statusQuery, user_id: userId },
      relations: ["user", "requests", "requests.item", "requests.owner"]
    });
    return allRequests;
  },

  create: async ({ requestId, userId }: IHelpers): Promise<RequestHelper> => {
    const repository = requestsHelpersRepository.getRepo();

    const requestHelper = await repository.create({
      request_id: requestId,
      user_id: userId
    });

    await repository.save(requestHelper);

    return requestHelper;
  }
};

export default requestsHelpersRepository;
