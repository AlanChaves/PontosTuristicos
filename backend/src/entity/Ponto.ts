import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity("pontos")
export class Ponto {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar", { length: 100, nullable: false })
  name?: string;

  @Column("varchar", { length: 100, nullable: false })
  description?: string;

  @Column("varchar", { length: 100, nullable: false })
  reference?: string;

  @Column("varchar", { length: 2, nullable: false })
  state?: string;

  @Column("varchar", { length: 100, nullable: false })
  city?: string;

  @CreateDateColumn()
  insertedAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
