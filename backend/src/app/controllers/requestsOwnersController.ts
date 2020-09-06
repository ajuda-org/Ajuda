import * as Yup from "yup";
import { Request, Response } from "express";
import { requestsOwnerService } from "../services";

const requestsOwnersController = {
  index: async (req: Request, res: Response): Promise<void> => {
    const schema = Yup.object().shape({
      ownerId: Yup.string().required(
        "É obrigatório informar o id do dono do pedido."
      ),
      status: Yup.array()
    });

    await schema.validate(req.body).then(
      async () => {
        const { ownerId, status } = req.body;
        const requestsHelpers = await requestsOwnerService.listByStatus(
          ownerId,
          status
        );
        return res.status(200).json(requestsHelpers);
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const schema = Yup.object().shape({
      ownerId: Yup.string().required(
        "É obrigatório informar o id do dono do pedido."
      ),
      helperId: Yup.string().required(
        "É obrigatório informar o id do ajudante."
      )
    });

    await schema.validate(req.body).then(
      async () => {
        const { ownerId, helperId } = req.body;
        const { requestId } = req.params;

        const requestsOwnersServiceResponse = await requestsOwnerService.update(
          ownerId,
          helperId,
          requestId
        );

        return res
          .status(requestsOwnersServiceResponse.status)
          .json(requestsOwnersServiceResponse.entityOrError);
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  }
};

export default requestsOwnersController;
