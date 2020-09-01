import * as Yup from "yup";
import { Request, Response } from "express";
import knex from "../../database/connection";

const helpedController = {
  index: async (req: Request, res: Response): Promise<void> => {
    const schema = Yup.object().shape({
      userId: Yup.string().required("É obrigatório informar o id do ajudado."),
      status: Yup.string().required(
        "É obrigatório informar o status do pedido."
      )
    });

    await schema.validate(req.query).then(
      async () => {
        const { userId, status } = req.query;
        const parsedStatus = String(status)
          .split(",")
          .map(item => Number(item.trim()));

        const requests = await knex("requests")
          .join("requests_items", "requests_items.request_id", "requests.id")
          .join("items", "items.id", "requests_items.item_id")
          .join(
            "requests_helpers",
            "requests_helpers.request_id",
            "requests.id"
          )
          .join("requests_owners", "requests_owners.request_id", "requests.id")
          .join("users", "users.id", "requests_helpers.user_id")
          .where("requests_owners.user_id", Number(userId))
          .whereIn("requests.status", parsedStatus)
          .distinct()
          .select("requests.*", "users.*", "items.*");

        return res.status(200).json(requests);
      },
      ({ errors, path }) => {
        return res.status(422).json({ field: path, error: errors[0] });
      }
    );
  }
};

export default helpedController;
