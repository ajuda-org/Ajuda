import * as Yup from "yup";
import { Request, Response } from "express";
import knex from "../../database/connection";

import { userService } from "../services";

const sessionsController = {
  create: async (req: Request, res: Response): Promise<void> => {
    const schema = Yup.object().shape({
      userEmail: Yup.string()
        .email("O campo e-mail não pode ficar em branco.")
        .required(),
      userPassword: Yup.string()
        .required("O campo senha não pode ficar em branco.")
        .min(6, "Senha deve possuir no mínimo 6 caracteres."),
      userType: Yup.string()
        .required("O campo type não pode ficar em branco.")
        .oneOf(
          ["helper", "helped"],
          "O tipo do usuário deve ser helper ou helped."
        )
    });

    await schema.validate(req.body).then(
      async () => {
        const { userEmail, userPassword, userType } = req.body;
        const userExist = await knex("users")
          .where("users.email", userEmail)
          .where("users.type", userType)
          .first();

        if (!userExist) {
          return res.status(401).json({
            field: "email",
            error: "E-mail não esta cadastrado na aplicação."
          });
        }

        const encryptedPassword = await userService.checkPassword(
          userPassword,
          userExist.password
        );

        if (!encryptedPassword) {
          return res.status(401).json({
            field: "password",
            error: "Senha informada esta incorreta."
          });
        }
        const { id, name, cpf, whatsapp, email, type } = userExist;

        return res.status(200).json({ id, name, cpf, whatsapp, email, type });
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  }
};

export default sessionsController;
