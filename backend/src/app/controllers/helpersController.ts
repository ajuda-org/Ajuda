import * as Yup from "yup";
import { Request, Response } from "express";
import knex from "../../database/connection";

const helpersController = {
  // index: async (req: Request, res: Response): Promise<Response> => {
  //   const { itemId } = req.query;
  //   const requests = await knex("requests")
  //     .join("requests_items", "requests_items.item_id", "items.id")
  //     .where("requests_items.item_id", String(itemId))
  //     .distinct()
  //     .select("requests.*");

  //   return res.status(200).json(requests);
  // },
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
        const requestHelper = {
          request_id: requestId,
          user_id: userId,
          status: 0
        };

        const userIsHelper = await knex("users")
          .where("users.id", userId)
          .where("users.type", "helper")
          .first();

        if (!userIsHelper) {
          return res.status(401).json({
            field: "type",
            error:
              "Não é possivel oferecer ajuda no pedido, pois o usuário não é do tipo 'Ajudante'."
          });
        }

        const trx = await knex.transaction();

        const insertedRequestHelper = await trx("requests_helpers").insert(
          requestHelper
        );

        await trx.commit();

        return res.status(201).json({
          requestHelper: {
            id: insertedRequestHelper[0],
            ...userIsHelper
          }
        });
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  }
};

export default helpersController;
