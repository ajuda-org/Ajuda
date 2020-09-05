import * as Yup from "yup";
import { Request, Response } from "express";
import knex from "../../database/connection";
import { requestsService } from "../services";

const requestsController = {
  index: async (req: Request, res: Response): Promise<Response> => {
    const requests = await requestsService.listAll();
    return res.status(200).json(requests);
  },

  show: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const requests = await knex("requests")
      .where("requests.id", Number(id))
      .first();

    if (!requests) {
      return res.status(404).json({
        field: "id",
        error: "O pedido informado não existe."
      });
    }

    const item = await knex("items")
      .join("requests_items", "requests_items.item_id", "items.id")
      .where("requests_items.request_id", id)
      .select("items.name", "items.image")
      .first();

    return res.status(200).json({ requests, item });
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
          user_id: userId
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
