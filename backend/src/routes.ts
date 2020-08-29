import { Router } from "express";
import itemsController from "./controllers/items_controller";

const routes = Router();

routes.get("/items", itemsController.index);

export default routes;
