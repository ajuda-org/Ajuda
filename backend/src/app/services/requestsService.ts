import { requestsRepository } from "../repositories";
import {
  IServiceResponseWithError,
  IServiceResponseWithRequest,
  IRequest
} from "../interfaces";

const requestsService = {
  listAll: async (): Promise<IRequest[]> => {
    const users = await requestsRepository.listAllRequests();
    return users;
  },

  create: async ({
    title,
    description,
    latitude,
    longitude,
    item_id,
    user_id
  }: IRequest): Promise<
    IServiceResponseWithError | IServiceResponseWithRequest
  > => {
    const userIsHelped = await requestsRepository.userIsHelped(user_id);

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
      user_id
    });

    return { status: 201, entityOrError: createRequest };
  }
};

export default requestsService;
