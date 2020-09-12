import { userRepository } from "../repositories";
import {
  IServiceResponseWithUser,
  IServiceResponseWithError,
  ISession
} from "../interfaces";

const sessionsService = {
  create: async ({
    email,
    password,
    type
  }: ISession): Promise<
    IServiceResponseWithError | IServiceResponseWithUser
  > => {
    const userExist = await userRepository.showUserByEmailAndType(email, type);

    if (!userExist) {
      return {
        status: 401,
        entityOrError: {
          field: "email",
          error: "E-mail não esta cadastrado na aplicação."
        }
      };
    }

    const encryptedPassword = await userExist.checkPassword(password);

    if (!encryptedPassword) {
      return {
        status: 401,
        entityOrError: {
          field: "password",
          error: "Senha informada esta incorreta."
        }
      };
    }
    const { id, name, cpf, whatsapp } = userExist;
    return {
      status: 200,
      entityOrError: { id, name, cpf, email, type, whatsapp }
    };
  }
};

export default sessionsService;
