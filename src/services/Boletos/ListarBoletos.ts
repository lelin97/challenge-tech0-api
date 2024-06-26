import { AppDataSource } from "../../data-source";
import Boletos from "../../models/Boletos";
import { RetornoDB } from "../../types/retornoDB";

export default class ListarBoletos {
  public async executar(): Promise<RetornoDB> {
    const tabelaBoleto = AppDataSource.getRepository(Boletos);
    const resultado = await tabelaBoleto
      .createQueryBuilder()
      .getMany()
      .then((data) => {
        return {
          sucesso: true,
          data: data,
        } as const;
      })
      .catch((error) => {
        return {
          sucesso: false,
          mensagem: "Houve um erro ao buscar os Boletos.",
          erro: error,
        };
      });

    return resultado;
  }
}
