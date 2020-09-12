import * as Yup from "yup";
import { Request, Response } from "express";
import { requestsService } from "../services";

const requestsController = {
  index: async (req: Request, res: Response): Promise<Response> => {
    const { itemsId } = req.query;
    const parsedItems = String(itemsId)
      .split(",")
      .map(item => Number(item.trim()));

    const requests = await requestsService.listAllByItem(parsedItems);
    return res.status(200).json(requests);
  },

  show: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const requestsServiceResponse = await requestsService.showUserById(id);

    return res
      .status(requestsServiceResponse.status)
      .json(requestsServiceResponse.entityOrError);
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const schema = Yup.object().shape({
      title: Yup.string().required("O campo titulo não pode ficar em branco."),
      description: Yup.string().required(
        "O campo descrição não pode ficar em branco."
      ),
      itemId: Yup.string()
        .required("Não é possível criar um pedido sem o tipo de ajuda.")
        .oneOf(
          ["1", "2", "3", "4", "5", "6"],
          "O id do item deve ser entre 1 a 6."
        ),
      latitude: Yup.string().required(
        "O campo latitude não pode ficar em branco."
      ),
      longitude: Yup.string().required(
        "O campo longitude não pode ficar em branco."
      ),
      userId: Yup.string().required("O campo userId não pode ficar em branco.")
    });

    await schema.validate(req.body).then(
      async () => {
        const {
          title,
          description,
          latitude,
          longitude,
          itemId,
          userId
        } = req.body;

        const requestsServiceResponse = await requestsService.create({
          title,
          description,
          latitude,
          longitude,
          item_id: itemId,
          owner_id: userId
        });

        return res
          .status(requestsServiceResponse.status)
          .json(requestsServiceResponse.entityOrError);
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  }
};

export default requestsController;
