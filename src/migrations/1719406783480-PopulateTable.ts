import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateTable1719406783480 implements MigrationInterface {
  name = "PopulateTable1719406783480";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO public.boletos (id_boleto,descricao,data_vencimento,valor,valor_multa,juros,valor_total,dt_baixa,status_baixa,dt_cadastro,usuario_cadastro,dt_atualizacao,usuario_atualizacao) VALUES
	 ('15fcdcf9-f081-479e-ba6e-ada2b745752e','Boleto 1','2024-06-26 00:00:00',100.0,0.0,30.0,100.0,NULL,false,'2024-06-26 20:21:21.217238','c15147ac-d5ca-406c-b1d7-73e18d0e7a2c','2024-06-26 20:21:21.217238',NULL),
	 ('1dd9b3e6-d698-4f5a-afd2-d3fee3a33a87','Boleto 2','2024-06-26 00:00:00',50.0,0.0,10.0,50.0,NULL,false,'2024-06-26 20:21:35.46101','c15147ac-d5ca-406c-b1d7-73e18d0e7a2c','2024-06-26 20:21:35.46101',NULL),
	 ('a3ec97e2-4794-43b4-8324-35a85297147c','Boleto 3','2024-06-26 00:00:00',200.0,0.0,20.0,200.0,'2024-06-26 17:21:53.891',true,'2024-06-26 20:21:47.561513','c15147ac-d5ca-406c-b1d7-73e18d0e7a2c','2024-06-26 20:21:53.890781','c15147ac-d5ca-406c-b1d7-73e18d0e7a2c');
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
