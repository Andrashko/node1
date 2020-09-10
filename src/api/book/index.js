import {Router} from "express";
import bookControler from "./controler";

const bookRouter = new Router();
bookRouter.get("/", bookControler.get); 
bookRouter.get("/:id", bookControler.getById);
bookRouter.delete("/:id", bookControler.delete);
bookRouter.post ("/", bookControler.post);
bookRouter.patch("/:id",bookControler.patch);

export default bookRouter;