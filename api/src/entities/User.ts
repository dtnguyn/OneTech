import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { DeviceProblem } from "./DeviceProblem";
import { DeviceProblemStar } from "./DeviceProblemStar";
import { Solution } from "./Solution";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
  oauthId: string;

  @Field()
  @Column()
  username: string;

  @Field(() => String, { nullable: true })
  @Column({ unique: true, nullable: true })
  email?: string;

  @Field(() => String)
  @Column({ nullable: true })
  avatar?: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [DeviceProblem], { nullable: true })
  @OneToMany(() => DeviceProblem, (deviceProblem) => deviceProblem.author)
  problems: DeviceProblem[];

  @Field(() => [DeviceProblemStar], { nullable: true })
  @OneToMany(() => DeviceProblemStar, (star) => star.user)
  deviceProblemStars: DeviceProblemStar[];

  @Field(() => [Solution], { nullable: true })
  @OneToMany(() => Solution, (solution) => solution.author)
  solutions: Solution[];
}
