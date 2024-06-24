import { Router } from "express";
import { boletosRouter } from "./boletos";

const router = Router();

router.use("/boletos", boletosRouter);

export default router;
