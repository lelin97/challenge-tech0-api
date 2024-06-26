import { format } from "date-fns";
import { z } from "zod";

export const cadastroBoleto = z.object({
  descricao: z.string().min(1),
  dt_venc: z.coerce.date().transform((v) => format(v, "yyyy-MM-dd")),
  valor: z.coerce.number(),
  valor_multa: z.coerce.number(),
  juros: z.coerce.number(),
});

export const deletarBoleto = z.string().uuid();

export type TCadastroBoleto = z.infer<typeof cadastroBoleto>;
