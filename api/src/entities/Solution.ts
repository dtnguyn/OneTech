import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { DeviceProblem } from "./DeviceProblem";
import { User } from "./User";

@ObjectType()
@Entity()
export class Solution {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isPicked?: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  authorId: string;
  @ManyToOne(() => User, (user) => user.solutions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "authorId" })
  author: User;

  @Field(() => String)
  @Column()
  problemId: string;
  @ManyToOne(() => DeviceProblem, (problem) => problem.stars, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "problemId" })
  problem: DeviceProblem;
}
