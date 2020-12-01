import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { DeviceProblem } from "./DeviceProblem";
import { User } from "./User";

@ObjectType()
@Entity()
export class DeviceProblemStar {
  @Field()
  @PrimaryColumn()
  userId: string;
  @ManyToOne(() => User, (user) => user.deviceProblemStars, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => String)
  @PrimaryColumn()
  problemId: string;
  @ManyToOne(() => DeviceProblem, (problem) => problem.stars, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "problemId" })
  problem: DeviceProblem;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
