import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { DeviceProblem } from "./DeviceProblem";
import { SolutionImage } from "./SolutionImage";
import { SolutionStar } from "./SolutionStar";
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

  @Field()
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
  @Field(() => User)
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

  @Field(() => [SolutionStar], { nullable: true })
  @OneToMany(() => SolutionStar, (star) => star.solution)
  stars: SolutionStar[];

  @Field(() => [SolutionImage])
  @OneToMany(() => SolutionImage, (image) => image.solution)
  images: SolutionImage[];
}

@ObjectType()
export class SolutionResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [Solution], { nullable: true })
  data?: Solution[] | null;
}
