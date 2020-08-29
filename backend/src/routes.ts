import { Router } from "express";
import { itemsController, usersController } from "./controllers";

const routes = Router();

routes.get("/users", usersController.index);
routes.get("/users/:id", usersController.show);
routes.post("/users", usersController.create);
routes.put("/users/:id", usersController.update);

routes.get("/items", itemsController.index);

export default routes;
