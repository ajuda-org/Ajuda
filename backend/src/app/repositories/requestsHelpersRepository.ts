import { getRepository, Repository, In, Not, UpdateResult } from "typeorm";
import { RequestHelper } from "../models";

interface IHelpers {
  requestId: string;
  userId: string;
}

const requestsHelpersRepository = {
  getRepo: (): Repository<RequestHelper> => {
    return getRepository(RequestHelper);
  },

  HelperIsValid: async (
    helperId: string,
    requestId: string
  ): Promise<RequestHelper | undefined> => {
    const repository = requestsHelpersRepository.getRepo();
    const isHelperValid = await repository.findOne({
      user_id: Number(helperId),
      request_id: Number(requestId)
    });
    return isHelperValid;
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
      request_id: Number(requestId),
      user_id: Number(userId)
    });

    await repository.save(requestHelper);

    return requestHelper;
  },

  update: async (helperId: string): Promise<UpdateResult> => {
    const repository = requestsHelpersRepository.getRepo();
    const updatedHelper = await repository.update(helperId, {
      status: 1
    });
    return updatedHelper;
  }
};

export default requestsHelpersRepository;
