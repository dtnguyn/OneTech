import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Solution } from "./Solution";

@ObjectType()
@Entity()
export class SolutionImage {
  @Field()
  @PrimaryColumn()
  path: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column()
  solutionId: string;
  @ManyToOne(() => Solution, (solution) => solution.images, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @Field(() => Solution)
  @JoinColumn({ name: "solutionId" })
  solution: Solution;
}

@ObjectType()
export class SolutionImageResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [SolutionImage], { nullable: true })
  data?: SolutionImage[] | null;
}
