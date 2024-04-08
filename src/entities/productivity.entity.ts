import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from "typeorm";
import { Languages } from "./language.entity.js";

@Entity()
export class Productivity  {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  year!: number;

  @Column()
  month!: number ;

  @Column()
  day!: number ;

  @Column()
  hour!: number ;

  @Column()
  minute!: number ;

  @Column()
  seconds!: number ;

  @Column()
  totalProductivityInSeconds!: number ;

  @Column()
  totalTimeInVim!: number ;

  @Column()
  totalTimeSpentThinkingOrSearching!: number ;

  @Column()
  projectPath!: string ;

  @Column()
  commitMsg!: string ;

  @OneToMany(() => Languages, (languages) => languages.productivity)
  languages!: Relation<Languages[]>;
}
