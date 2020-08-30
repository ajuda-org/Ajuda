import * as Yup from "yup";
import { Request, Response } from "express";
import knex from "../../database/connection";

const requestsController = {
  index: async (req: Request, res: Response): Promise<Response> => {
    const requests = await knex("requests").select("*");
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
      itemId: Yup.string().required(
        "Não é possível criar um pedido sem o tipo de ajuda."
      ),
      latitude: Yup.string().required(
        "O campo latitude não pode ficar em branco."
      ),
      longitude: Yup.string().required(
        "O campo longitude não pode ficar em branco."
      )
    });

    await schema.validate(req.body).then(
      async () => {
        const { title, description, latitude, longitude, itemId } = req.body;
        const { id } = req.headers;
        const request = {
          title,
          description,
          latitude,
          longitude,
          status: 0
        };

        const userIsHelped = await knex("users")
          .where("users.id", id)
          .where("users.type", "helped");

        if (!userIsHelped[0]) {
          return res.status(401).json({
            field: "type",
            error:
              "Não é possivel criar o pedido, pois o usuário não é do tipo 'Ajudado'."
          });
        }

        const trx = await knex.transaction();
        const insertedId = await trx("requests").insert(request);

        const requestId = insertedId[0];

        const requestsOwners = { request_id: requestId, user_id: id };
        await trx("requests_owners").insert(requestsOwners);

        const requestsItems = { request_id: requestId, item_id: itemId };
        await trx("requests_items").insert(requestsItems);

        await trx.commit();

        return res
          .status(201)
          .json({ user: { id: insertedId[0], ...request } });
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  }
};

export default requestsController;
