import { Router } from "express";
import { itemsController, usersController } from "./controllers";

const routes = Router();

routes.post("/users", usersController.create);

routes.get("/items", itemsController.index);

export default routes;
