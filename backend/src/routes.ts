import { Router } from "express";
import {
  sessionsController,
  usersController,
  itemsController,
  requestsController,
  helpersController
} from "./app/controllers";

const routes = Router();

routes.post("/sessions", sessionsController.create);

routes.get("/users", usersController.index);
routes.get("/users/:id", usersController.show);
routes.post("/users", usersController.create);
routes.put("/users/:id", usersController.update);

routes.get("/requests", requestsController.index);
routes.get("/requests/:id", requestsController.show);
routes.post("/requests", requestsController.create);

routes.get("/requests_by_item", helpersController.index);
routes.post("/request_help", helpersController.create);

routes.get("/items", itemsController.index);

export default routes;
