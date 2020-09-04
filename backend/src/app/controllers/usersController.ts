import * as Yup from "yup";
import { Request, Response } from "express";
import knex from "../../database/connection";

import { userService } from "../services";

const usersController = {
  index: async (req: Request, res: Response): Promise<Response> => {
    const users = await userService.listAll();

    return res.status(200).json(users);
  },
  show: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const userExist = await knex("users").where("users.id", Number(id)).first();

    if (!userExist) {
      return res.status(404).json({
        field: "id",
        error: "Usuário não está cadastrado na aplicação."
      });
    }

    const users = await knex("users")
      .select("*")
      .where("users.id", Number(id))
      .first();

    return res.status(200).json(users);
  },

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

        const user = await userService.create({
          name,
          cpf,
          whatsapp,
          type,
          email,
          password
        });

        if (!user) {
          return res.status(401).json({
            field: "email",
            error: "E-mail já esta cadastrado na aplicação."
          });
        }

        return res.status(201).json(user);
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  },
  update: async (req: Request, res: Response): Promise<void> => {
    const schema = Yup.object().shape({
      whatsapp: Yup.string()
        .min(14, "O número informado é inválido.")
        .required("O campo WhatsApp não pode ficar em branco.")
    });

    await schema.validate(req.body).then(
      async () => {
        const { id } = req.params;
        const { whatsapp } = req.body;

        const userExist = await knex("users")
          .where("users.id", Number(id))
          .first();

        if (!userExist) {
          return res.status(404).json({
            field: "id",
            error: "Usuário não está cadastrado na aplicação."
          });
        }

        const trx = await knex.transaction();
        const updatedId = await trx("users")
          .where({ id })
          .update("whatsapp", whatsapp);

        await trx.commit();

        return res.status(200).json({ updatedId });
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  }
};

export default usersController;
