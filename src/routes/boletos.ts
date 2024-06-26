import { Router } from "express";
import CriarBoleto from "../services/Boletos/CriarBoleto";
import { cadastroBoleto, deletarBoleto } from "../zod/Boleto/cadastro";
import logger from "../logger";
import ListarBoletos from "../services/Boletos/ListarBoletos";
import EditarBoleto from "../services/Boletos/EditarBoleto";
import DeletarBoleto from "../services/Boletos/DeletarBoleto";

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

boletosRouter.put("/atualizar-boleto/:id_boleto", async (req, res) => {
  try {
    const dadosBody = cadastroBoleto.safeParse(req.body);
    const id_boleto = req.params.id_boleto;

    if (dadosBody.error) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Campos da requisição inválidos.",
        error: dadosBody.error.errors,
      });
    }
    const service = new EditarBoleto();
    const resultado = await service.executar(dadosBody.data, id_boleto);

    return res.status(resultado.sucesso ? 200 : 500).json(resultado);
  } catch (error) {
    logger.error("/editar-boleto. ERRO:", error);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao Editar Boleto.",
      erro: error,
    });
  }
});

boletosRouter.get("/listar-boleto", async (req, res) => {
  try {
    const service = new ListarBoletos();
    const resultado = await service.executar();

    return res.status(resultado.sucesso ? 200 : 500).json(resultado);
  } catch (error) {
    logger.error("/listar-boleto. ERRO:", error);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao Listar Boletos.",
      erro: error,
    });
  }
});

boletosRouter.delete("/deletar-boleto/:id_boleto", async (req, res) => {
  try {
    const id_boleto = deletarBoleto.safeParse(req.params.id_boleto);

    if (id_boleto.error) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Campo da requisição inválidos",
        error: id_boleto.error.errors,
      });
    }

    const service = new DeletarBoleto();
    const resultado = await service.executar(String(id_boleto.data));

    return res.status(resultado.sucesso ? 200 : 500).json(resultado);
  } catch (error) {
    logger.error("/deletar-boleto. ERRO:", error);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao Deletar Boletos",
      erro: error,
    });
  }
});

export { boletosRouter };
