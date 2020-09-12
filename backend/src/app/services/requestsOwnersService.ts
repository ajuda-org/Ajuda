import {
  requestsOwnersRepository,
  requestsRepository,
  requestsHelpersRepository
} from "../repositories";
import {
  IServiceResponseWithError,
  IServiceResponseWithRequest
} from "../interfaces";

import { Request } from "../models";

const requestsOwnersService = {
  listByStatus: async (ownerId: number, status: number): Promise<Request[]> => {
    const requests = await requestsOwnersRepository.listAllByStatus(
      ownerId,
      status
    );
    return requests;
  },

  update: async (
    ownerId: string,
    helperId: string,
    requestId: string
  ): Promise<IServiceResponseWithError | IServiceResponseWithRequest> => {
    const isRequestAvaliable = await requestsRepository.RequestAvaliableByIdAndOwner(
      requestId,
      ownerId
    );

    const isHelperValid = await requestsHelpersRepository.HelperIsValid(
      helperId,
      requestId
    );

    if (!isRequestAvaliable) {
      return {
        status: 404,
        entityOrError: {
          field: "requestId",
          error: "Pedido não existe ou não está com status 0"
        }
      };
    }

    if (!isHelperValid) {
      return {
        status: 404,
        entityOrError: {
          field: "requestId",
          error:
            "Ajudante informado não existe ou não solicitou ajuda ao pedido."
        }
      };
    }

    await requestsRepository.update(requestId);

    await requestsHelpersRepository.update(helperId);

    return { status: 201, entityOrError: isRequestAvaliable };
  }
};

export default requestsOwnersService;
