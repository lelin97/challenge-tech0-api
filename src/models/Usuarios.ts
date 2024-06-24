import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Boletos from "./Boletos";

@Entity("usuarios")
export default class Usuarios {
  @PrimaryGeneratedColumn("uuid")
  id_usuario: string;

  @Column({ type: "varchar", length: 100 })
  nome: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar", length: 200 })
  senha: string;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @CreateDateColumn()
  dt_cadastro: Date;

  @Column("uuid")
  usuario_cadastro: string;

  @UpdateDateColumn()
  dt_atualizacao: Date;

  @Column({ type: "uuid", nullable: true })
  usuario_atualizacao: string;

  // @OneToMany(() => Boletos, (b) => b.usuariosBoleto)
  // @JoinColumn({ referencedColumnName: "id_boleto", name: "id_usuario" })
  // boletos: Boletos[];
}
