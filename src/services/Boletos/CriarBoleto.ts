import { AppDataSource } from "../../data-source";
import Boletos from "../../models/Boletos";
import { RetornoDB } from "../../types/retornoDB";
import { TCadastroBoleto } from "../../zod/Boleto/cadastro";

export default class CriarBoleto {
  public async executar(campos: TCadastroBoleto): Promise<RetornoDB> {
    const tabelaBoleto = AppDataSource.getRepository(Boletos);

    const boletoExiste = await tabelaBoleto.findOne({
      where: {
        descricao: campos.descricao,
      },
    });

    if (boletoExiste) {
      return {
        sucesso: false,
        mensagem: "Boleto já cadastrado.",
        erro: "Boleto já cadastrado.",
      };
    }

    const resultado = await tabelaBoleto
      .createQueryBuilder()
      .insert()
      .into(Boletos)
      .values({
        descricao: campos.descricao,
        data_vencimento: campos.dt_venc,
        valor_multa: campos.valor_multa,
        juros: campos.juros,
      })
      .execute();

    return {
      sucesso: true,
      mensagem: `Cadastrado com sucesso. ${resultado.identifiers[0]}`,
    };
  }
}
