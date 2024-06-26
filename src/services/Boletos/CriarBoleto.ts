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

    await tabelaBoleto
      .createQueryBuilder()
      .insert()
      .into(Boletos)
      .values({
        descricao: campos.descricao,
        data_vencimento: campos.dt_venc,
        valor: campos.valor,
        valor_multa: campos.valor_multa,
        juros: campos.juros,
        valor_total: campos.valor + campos.valor_multa,
        usuario_cadastro: "c15147ac-d5ca-406c-b1d7-73e18d0e7a2c",
      })
      .execute();

    return {
      sucesso: true,
      mensagem: `Cadastrado com sucesso.`,
    };
  }
}
