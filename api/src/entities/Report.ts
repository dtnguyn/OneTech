import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DeviceProblem } from "./DeviceProblem";
import { Review } from "./Review";
import { Solution } from "./Solution";
import { User } from "./User";

@ObjectType()
@Entity()
export class Report {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  authorId: string;
  @ManyToOne(() => User, (user) => user.reports, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @Field(() => User)
  @JoinColumn({ name: "authorId" })
  author: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  problemId: string;
  @ManyToOne(() => DeviceProblem, (problem) => problem.reports, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "problemId" })
  problem: DeviceProblem;

  @Field({ nullable: true })
  @Column({ nullable: true })
  reviewId: string;
  @ManyToOne(() => Review, (review) => review.reports, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "reviewId" })
  review: Review;

  @Field({ nullable: true })
  @Column({ nullable: true })
  solutionId: string;
  @ManyToOne(() => Solution, (solution) => solution.reports, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "solutionId" })
  solution: Solution;
}

@ObjectType()
export class ReportResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [Report], { nullable: true })
  data?: Report[] | null;
}
