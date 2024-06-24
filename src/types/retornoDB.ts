export type RetornoDB =
  | {
      sucesso: true;
      mensagem?: string;
      data?: any;
    }
  | {
      sucesso: false;
      mensagem: string;
      erro: string;
    };
