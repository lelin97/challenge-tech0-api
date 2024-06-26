import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateModels1719406783475 implements MigrationInterface {
    name = 'CreateModels1719406783475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boletos" ("id_boleto" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying(100) NOT NULL, "data_vencimento" TIMESTAMP NOT NULL DEFAULT now(), "valor" double precision NOT NULL, "valor_multa" double precision NOT NULL, "juros" double precision NOT NULL, "valor_total" double precision NOT NULL, "dt_baixa" TIMESTAMP, "status_baixa" boolean NOT NULL DEFAULT false, "dt_cadastro" TIMESTAMP NOT NULL DEFAULT now(), "usuario_cadastro" uuid NOT NULL, "dt_atualizacao" TIMESTAMP DEFAULT now(), "usuario_atualizacao" uuid, CONSTRAINT "PK_f6006fb751ff9ca4f7a41ea41e3" PRIMARY KEY ("id_boleto"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "boletos"`);
    }

}
