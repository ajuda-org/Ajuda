import * as Yup from "yup";
import { Request, Response } from "express";
import knex from "../database/connection";

const usersController = {
  create: async (req: Request, res: Response): Promise<void> => {
    const schema = Yup.object().shape({
      name: Yup.string().required("O campo nome não pode ficar em branco."),
      cpf: Yup.string()
        .required("O campo cpf não pode ficar em branco.")
        .min(14, "Número de CPF inválido."),
      whatsapp: Yup.string()
        .min(14, "O número informado é inválido.")
        .required("O campo WhatsApp não pode ficar em branco."),
      type: Yup.string()
        .required("O campo type não pode ficar em branco.")
        .oneOf(
          ["helper", "helped"],
          "O tipo do usuário deve ser helper ou helped."
        ),
      email: Yup.string()
        .email("O campo e-mail não pode ficar em branco.")
        .required(),
      password: Yup.string()
        .required("O campo senha não pode ficar em branco.")
        .min(6, "Senha deve possuir no mínimo 6 caracteres.")
    });

    await schema.validate(req.body).then(
      async () => {
        const { name, cpf, whatsapp, type, email, password } = req.body;
        const user = { name, cpf, whatsapp, type, email, password };

        const userExist = await knex("users").where("users.email", email);

        if (userExist) {
          return res.status(401).json({
            field: "email",
            error: "E-mail já esta cadastrado na aplicação."
          });
        }

        const trx = await knex.transaction();
        const insertedId = await trx("users").insert(user);

        return res.status(201).json({ user: { id: insertedId[0], ...user } });
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  }
};

export default usersController;
