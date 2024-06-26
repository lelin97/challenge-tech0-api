import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import Boletos from "../../models/Boletos";
import { RetornoDB } from "../../types/retornoDB";
const { differenceInDays } = require("date-fns");

export default class BaixaBoleto {
  public async executar(
    boletos: string[],
    usuario_cadastro: string
  ): Promise<RetornoDB> {
    const tabelaBoleto = AppDataSource.getRepository(Boletos);

    const boletosEncontrados = await tabelaBoleto.find({
      select: {
        id_boleto: true,
        data_vencimento: true,
        valor: true,
        valor_multa: true,
        juros: true,
      },
      where: {
        id_boleto: In(boletos),
      },
    });

    if (!boletosEncontrados) {
      return {
        sucesso: false,
        mensagem: "Boleto não encontrado.",
        erro: "Boleto não encontrado.",
      };
    }

    let resultado: RetornoDB = {
      sucesso: true,
      mensagem: "Baixas realizadas com sucesso.",
    };

    const createQueryRunner = AppDataSource.createQueryRunner();
    await createQueryRunner.connect();

    await createQueryRunner.startTransaction();

    try {
      boletosEncontrados.forEach(async (boleto, i) => {
        const dataAtual = new Date();
        const diasExpirados = differenceInDays(
          dataAtual,
          boleto.data_vencimento
        );

        let valorMulta = boleto.valor_multa;
        let valorTotal = boleto.valor_total;

        if (diasExpirados > 0) {
          valorMulta = (boleto.juros / 100) * boleto.valor * diasExpirados;
          valorTotal = boleto.valor + valorMulta;
        }

        await createQueryRunner.manager.update(
          Boletos,
          {
            id_boleto: boleto.id_boleto,
          },
          {
            usuario_atualizacao: usuario_cadastro,
            valor_multa: valorMulta,
            valor_total: valorTotal,
            dt_baixa: dataAtual,
            status_baixa: true,
          }
        );
      });

      await createQueryRunner.commitTransaction();
    } catch (error) {
      resultado = {
        sucesso: false,
        mensagem: "Erro ao realizar baixa.",
        erro: `${error}`,
      };

      await createQueryRunner.rollbackTransaction();
    } finally {
      await createQueryRunner.release();
    }

    return resultado;
  }
}
