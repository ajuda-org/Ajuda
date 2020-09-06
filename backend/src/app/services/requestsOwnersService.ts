import { requestsOwnersRepository } from "../repositories";
import { Request } from "../models";

const requestsOwnersService = {
  listByStatus: async (
    ownerId: string,
    status: string[]
  ): Promise<Request[]> => {
    const requests = await requestsOwnersRepository.listAllByStatus(
      ownerId,
      status
    );
    return requests;
  }
};

export default requestsOwnersService;
