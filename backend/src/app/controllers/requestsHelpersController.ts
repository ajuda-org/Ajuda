import * as Yup from "yup";
import { Request, Response } from "express";
import { requestsHelpersService } from "../services";

const helpersController = {
  index: async (req: Request, res: Response): Promise<void> => {
    const schema = Yup.object().shape({
      userId: Yup.string().required("É obrigatório informar o id do ajudante."),
      status: Yup.string().required("É obrigatório informar o status.")
    });

    await schema.validate(req.query).then(
      async () => {
        const { userId, status } = req.query;
        const requestsHelpers = await requestsHelpersService.listByStatus(
          Number(userId),
          Number(status)
        );
        return res.status(200).json(requestsHelpers);
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const schema = Yup.object().shape({
      requestId: Yup.string().required(
        "O id do pedido não pode ficar em branco."
      ),
      userId: Yup.string().required(
        "Não é possível criar um pedido sem o tipo de ajuda."
      )
    });

    await schema.validate(req.body).then(
      async () => {
        const { requestId, userId } = req.body;

        const requestsHelpersServiceResponse = await requestsHelpersService.create(
          {
            requestId,
            userId
          }
        );

        return res
          .status(requestsHelpersServiceResponse.status)
          .json(requestsHelpersServiceResponse.entityOrError);
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  }
};

export default helpersController;
