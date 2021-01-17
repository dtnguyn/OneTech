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
  OneToOne,
} from "typeorm";
import { Device } from "./Device";
import { DeviceProblemStar } from "./DeviceProblemStar";
import { ProblemImage } from "./ProblemImage";
import { Solution } from "./Solution";
import { User } from "./User";
import { Report } from "./Report";

@ObjectType()
@Entity()
export class DeviceProblem {
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

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  solvedBy: string | null;
  @ManyToOne(() => User, (user) => user.problemSolved, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @Field(() => User, { nullable: true })
  @JoinColumn({ name: "solvedBy" })
  solver: User;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  pickedSolutionId: string | null;
  @OneToOne(() => Solution, (solution) => solution.problem)
  @Field(() => Solution, { nullable: true })
  @JoinColumn({ name: "pickedSolutionId" })
  pickedSolution: Solution;

  @Field()
  @Column()
  authorId: string;
  @ManyToOne(() => User, (user) => user.problems, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @Field(() => User, { nullable: true })
  @JoinColumn({ name: "authorId" })
  author: User;

  @Field()
  @Column()
  deviceId: string;
  @ManyToOne(() => Device, (device) => device.problems, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @Field(() => Device)
  @JoinColumn({ name: "deviceId" })
  device: Device;

  @Field(() => [DeviceProblemStar], { nullable: true })
  @OneToMany(() => DeviceProblemStar, (star) => star.problem)
  stars: DeviceProblemStar[];

  @Field(() => [Report], { nullable: true })
  @OneToMany(() => Report, (report) => report.problem)
  reports: Report[];

  @Field(() => [Solution], { nullable: true })
  @OneToMany(() => Solution, (solution) => solution.problem)
  solutions: Solution[];

  @Field(() => [ProblemImage])
  @OneToMany(() => ProblemImage, (image) => image.problem)
  images: ProblemImage[];
}

@ObjectType()
export class ProblemResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [DeviceProblem], { nullable: true })
  data?: DeviceProblem[] | null;
}
