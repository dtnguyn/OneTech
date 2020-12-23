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
import { Device } from "./Device";
import { DeviceProblemStar } from "./DeviceProblemStar";
import { Solution } from "./Solution";
import { User } from "./User";

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

  @Field(() => Boolean)
  @Column({ default: false })
  isSolve?: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  authorId: string;
  @ManyToOne(() => User, (user) => user.problems, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @Field()
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

  @Field(() => [Solution], { nullable: true })
  @OneToMany(() => Solution, (solution) => solution.problem)
  solutions: Solution[];
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
