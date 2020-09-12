import {
  requestsRepository,
  requestsHelpersRepository,
  userRepository
} from "../repositories";

import { IServiceResponseWithError } from "../interfaces";

import { RequestHelper } from "../models";

interface IHelpers {
  requestId: string;
  userId: string;
}

interface serviceResponseWithHelper {
  status: number;
  entityOrError: RequestHelper;
}

const requestsHelpersService = {
  listByStatus: async (
    userId: number,
    status: number
  ): Promise<RequestHelper> => {
    const requests = await requestsHelpersRepository.listAllByStatus(
      userId,
      status
    );
    return requests;
  },

  create: async ({
    requestId,
    userId
  }: IHelpers): Promise<
    IServiceResponseWithError | serviceResponseWithHelper
  > => {
    const requestAvaliable = await requestsRepository.RequestAvaliableById(
      requestId
    );

    const userIsHelper = await userRepository.userIsHelper(userId);

    if (!requestAvaliable) {
      return {
        status: 404,
        entityOrError: {
          field: "type",
          error:
            "Não é possivel solicitar ajuda ao pedido, pois ele não está mais disponível."
        }
      };
    }

    if (!userIsHelper) {
      return {
        status: 401,
        entityOrError: {
          field: "type",
          error:
            "Não é possivel solicitar ajuda ao pedido, pois seu usuário não é do tipo 'Ajudante'."
        }
      };
    }

    const createRequest = await requestsHelpersRepository.create({
      requestId,
      userId
    });

    return { status: 201, entityOrError: createRequest };
  }
};

export default requestsHelpersService;
