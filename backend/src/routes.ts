import { Router } from "express";
import {
  sessionsController,
  usersController,
  itemsController,
  requestsController,
  helpersController,
  ownersController
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

routes.get("/helpers", helpersController.index);
routes.post("/helpers", helpersController.create);

routes.get("/owners", ownersController.index);
routes.put("/owners/:requestId", ownersController.update);

routes.get("/items", itemsController.index);

export default routes;
