import {Router} from "express";
import bookRouter from "./book";

const apiRouter = new Router ();

apiRouter.use("/book", bookRouter);
apiRouter.use ("/",  (req, res) => {res.send ("api")} );

export default apiRouter;