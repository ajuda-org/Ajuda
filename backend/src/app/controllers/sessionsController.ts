import * as Yup from "yup";
import { Request, Response } from "express";
import { sessionsService } from "../services";

const sessionsController = {
  create: async (req: Request, res: Response): Promise<void> => {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email("O campo e-mail não pode ficar em branco.")
        .required(),
      password: Yup.string()
        .required("O campo senha não pode ficar em branco.")
        .min(6, "Senha deve possuir no mínimo 6 caracteres."),
      type: Yup.string()
        .required("O campo type não pode ficar em branco.")
        .oneOf(
          ["helper", "helped"],
          "O tipo do usuário deve ser helper ou helped."
        )
    });

    await schema.validate(req.body).then(
      async () => {
        const { email, password, type } = req.body;

        const userServiceResponse = await sessionsService.create({
          email,
          password,
          type
        });

        return res
          .status(userServiceResponse.status)
          .json(userServiceResponse.userOrError);
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  }
};

export default sessionsController;
