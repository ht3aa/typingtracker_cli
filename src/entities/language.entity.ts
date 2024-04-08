import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, Relation } from "typeorm";
import { Productivity } from "./productivity.entity.js";

@Entity()
export class Languages{
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column()
  language!: string;

  @Column()
  productivityInSeconds!: number;

  @ManyToOne(() => Productivity, (productivity: Productivity) => productivity.languages)
  productivity!: Relation<Productivity>;
}
