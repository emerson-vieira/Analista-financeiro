import { Router } from "express";
import CustomerController from "./app/controllers/CustomerController";

const routes = Router();

routes.get("/customers", CustomerController.index);
routes.get("/customers/:id", CustomerController.find);
routes.post("/customers", CustomerController.store);
routes.put("/customers/:id", CustomerController.update);
routes.delete("/customers/:id", CustomerController.destroy);

export default routes;