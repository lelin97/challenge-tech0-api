import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("boletos")
export default class Boletos {
  @PrimaryGeneratedColumn("uuid")
  id_boleto: string;

  @Column({ type: "varchar", length: 100 })
  descricao: string;

  @CreateDateColumn({ type: "timestamp" })
  data_vencimento: Date;

  @Column({ type: "double precision" })
  valor: number;

  @Column({ type: "double precision" })
  valor_multa: number;

  @Column({ type: "double precision" })
  juros: number;

  @Column({ type: "double precision" })
  valor_total: number;

  @Column({ nullable: true })
  dt_baixa: Date;

  @Column({ type: "boolean", default: false })
  status_baixa: boolean;

  @CreateDateColumn()
  dt_cadastro: Date;

  @Column("uuid")
  usuario_cadastro: string;

  @UpdateDateColumn({ nullable: true, default: null })
  dt_atualizacao: Date;

  @Column({ type: "uuid", nullable: true })
  usuario_atualizacao: string;
}
