import express from "express";

import * as PontoController from "../api/PontoController";

const router = express.Router();

router.post("/ponto", PontoController.insert);
router.patch("/ponto/:id", PontoController.update);
router.delete("/ponto/:id", PontoController.remove);

router.get("/ponto/:id", PontoController.get);
router.get("/pontos", PontoController.getPagination);

export default router;
