import { requestsRepository } from "../repositories";
import {
  IServiceResponseWithError,
  IServiceResponseWithRequest,
  IRequest
} from "../interfaces";

import { Request } from "../models";

const requestsService = {
  listAll: async (itemId: string[]): Promise<Request[]> => {
    const requests = await requestsRepository.listAllRequests(itemId);
    return requests;
  },

  showUserById: async (
    id: string
  ): Promise<IServiceResponseWithError | IServiceResponseWithRequest> => {
    const RequestExist = await requestsRepository.showRequestById(id);
    if (!RequestExist) {
      return {
        status: 404,
        entityOrError: {
          field: "id",
          error: "O pedido informado não existe."
        }
      };
    }

    return { status: 201, entityOrError: RequestExist };
  },

  create: async ({
    title,
    description,
    latitude,
    longitude,
    item_id,
    owner_id
  }: IRequest): Promise<
    IServiceResponseWithError | IServiceResponseWithRequest
  > => {
    const userIsHelped = await requestsRepository.userIsHelped(owner_id);

    if (!userIsHelped) {
      return {
        status: 401,
        entityOrError: {
          field: "type",
          error:
            "Não é possivel criar o pedido, pois o usuário não é do tipo 'Ajudado'."
        }
      };
    }

    const createRequest = await requestsRepository.create({
      title,
      description,
      latitude,
      longitude,
      item_id,
      owner_id
    });

    return { status: 201, entityOrError: createRequest };
  }
};

export default requestsService;
