import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Usuarios from "./Usuarios";

@Entity("boletos")
export default class Boletos {
  @PrimaryGeneratedColumn("uuid")
  id_boleto: string;

  @Column({ type: "varchar", length: 100 })
  descricao: string;

  @CreateDateColumn({ type: "timestamp" })
  data_vencimento: Date;

  @Column({ type: "float8" })
  valor_multa: number;

  @Column({ type: "float8" })
  juros: number;

  @CreateDateColumn()
  dt_cadastro: Date;

  @Column("uuid")
  usuario_cadastro: string;

  @UpdateDateColumn()
  dt_atualizacao: Date;

  @Column({ type: "uuid", nullable: true })
  usuario_atualizacao: string;

  @ManyToOne(() => Usuarios, (u) => u.boletos)
  @JoinColumn({ referencedColumnName: "id_boleto", name: "id_usuario" })
  usuariosBoleto: Usuarios;
}
