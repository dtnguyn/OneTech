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
import { DeviceProblem } from "./DeviceProblem";

@ObjectType()
@Entity()
export class ProblemImage {
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
  problemId: string;
  @ManyToOne(() => DeviceProblem, (problem) => problem.images, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @Field(() => DeviceProblem)
  @JoinColumn({ name: "problemId" })
  problem: DeviceProblem;
}

@ObjectType()
export class UploadImageResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [String], { nullable: true })
  data?: string[] | null;
}

@ObjectType()
export class ProblemImageResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [ProblemImage], { nullable: true })
  data?: ProblemImage[] | null;
}
