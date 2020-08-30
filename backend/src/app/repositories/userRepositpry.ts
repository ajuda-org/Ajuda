import knex from "../../database/connection";
import { IUserInterface } from "../interfaces";

const userRepositpry = {
  listAllUsers: async (): Promise<IUserInterface[]> => {
    const users = await knex("users").select(
      "id",
      "name",
      "cpf",
      "whatsapp",
      "email",
      "type"
    );

    return users;
  }
};

export default userRepositpry;
