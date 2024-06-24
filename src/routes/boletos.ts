import { Router } from "express";
import CriarBoleto from "../services/Boletos/CriarBoleto";
import { cadastroBoleto } from "../zod/Boleto/cadastro";
import logger from "../logger";

const boletosRouter = Router();

boletosRouter.post("/criar-boleto", async (req, res) => {
  try {
    const dadosBody = cadastroBoleto.safeParse(req.body);

    if (dadosBody.error) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Campos da requisição inválidos.",
        error: dadosBody.error.errors,
      });
    }
    const service = new CriarBoleto();
    const resultado = await service.executar(dadosBody.data);

    return res.status(resultado.sucesso ? 200 : 500).json(resultado);
  } catch (error) {
    logger.error("/criar-boleto. ERRO:", error);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao Criar Boleto.",
      erro: error,
    });
  }
});

export { boletosRouter };
