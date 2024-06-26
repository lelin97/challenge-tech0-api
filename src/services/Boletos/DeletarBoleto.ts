import { AppDataSource } from "../../data-source";
import logger from "../../logger";
import Boletos from "../../models/Boletos";
import { RetornoDB } from "../../types/retornoDB";

export default class DeletarBoleto {
  public async executar(id_boleto: string): Promise<RetornoDB> {
    const tabelaBoleto = AppDataSource.getRepository(Boletos);
    const boletoExiste = await tabelaBoleto.findOne({
      where: {
        id_boleto,
      },
    });

    if (!boletoExiste) {
      const erro = "ID do Boleto não corresponde a nenhum existente.";
      logger.error(erro);
      return {
        sucesso: false,
        mensagem: "Boleto não encontrado.",
        erro: erro,
      };
    }

    await tabelaBoleto.delete({
      id_boleto,
    });

    return {
      sucesso: true,
      mensagem: "Boleto deletado com sucesso.",
    };
  }
}
