import { getRepository, Repository, In, Not, UpdateResult } from "typeorm";
import { RequestHelper } from "../models";
import requestsRepository from "./requestsRepository";

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
    userId: number,
    status: number
  ): Promise<RequestHelper> => {
    const repository = requestsHelpersRepository.getRepo();

    const allRequests = await repository.find({
      where: { status, user_id: userId },
      relations: ["user", "requests", "requests.item", "requests.owner"]
    });
    return allRequests[0];
  },

  create: async ({ requestId, userId }: IHelpers): Promise<RequestHelper> => {
    const repository = requestsHelpersRepository.getRepo();
    // STATUS 1 TEMPORÁRIAMENTE
    const requestHelper = await repository.create({
      request_id: Number(requestId),
      user_id: Number(userId),
      status: 1
    });

    await repository.save(requestHelper);
    await requestsRepository.update(requestId);
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
