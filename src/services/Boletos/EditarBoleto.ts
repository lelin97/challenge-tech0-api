import { UpdateResult } from "typeorm";
import { RetornoDB } from "../../types/retornoDB";
import { AppDataSource } from "../../data-source";
import Boletos from "../../models/Boletos";
import { TCadastroBoleto } from "../../zod/Boleto/cadastro";

export default class EditarBoleto {
  public async executar(
    campos: TCadastroBoleto,
    id_boleto: string
  ): Promise<RetornoDB> {
    if (!id_boleto) {
      return {
        sucesso: false,
        mensagem: "Erro ao editar Boleto.",
        erro: "Dados do formulário estão incorretos.",
      } as const;
    }

    const tabelaBoleto = AppDataSource.getRepository(Boletos);
    await tabelaBoleto
      .createQueryBuilder()
      .update()
      .set({
        descricao: campos.descricao,
        data_vencimento: campos.dt_venc,
        valor: campos.valor,
        valor_multa: campos.valor_multa,
        juros: campos.juros,
        valor_total: campos.valor + campos.valor_multa,
      })
      .where({
        id_boleto,
      })
      .execute()
      .then((data: UpdateResult) => {
        if (data.affected && data.affected > 0) {
          return {
            sucesso: true,
            mensagem: "Boleto editado com sucesso.",
            erro: false,
          };
        } else {
          return {
            sucesso: false,
            mensagem: "Boleto não encontrado.",
          };
        }
      })
      .catch((error) => {
        return {
          sucesso: false,
          mensagem: "Houve um erro ao editar Boleto.",
          erro: `${error}`,
        };
      });

    return {
      sucesso: true,
      mensagem: "Boleto Editado com sucesso.",
    };
  }
}
