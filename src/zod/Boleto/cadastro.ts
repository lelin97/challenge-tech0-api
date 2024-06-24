import { format } from "date-fns";
import { z } from "zod";

export const cadastroBoleto = z.object({
  descricao: z.string().min(1),
  dt_venc: z.coerce.date().transform((v) => format(v, "yyyy-MM-dd")),
  valor_multa: z.number().positive(),
  juros: z.number().positive(),
});

export type TCadastroBoleto = z.infer<typeof cadastroBoleto>;
