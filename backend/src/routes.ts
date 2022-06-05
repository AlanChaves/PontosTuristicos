import express from "express";

import PontoRouter from "./routes/PontoRouter";

const routes = express.Router();

routes.use(PontoRouter);

export default routes;
