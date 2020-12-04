import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { Solution } from "./Solution";
import { User } from "./User";

@ObjectType()
@Entity()
export class SolutionStar {
  @Field()
  @PrimaryColumn()
  userId: string;
  @ManyToOne(() => User, (user) => user.solutionStars, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => String)
  @PrimaryColumn()
  solutionId: string;
  @ManyToOne(() => Solution, (solution) => solution.stars, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "solutionId" })
  solution: Solution;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
