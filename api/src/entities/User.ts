import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { DeviceFollower } from "./DeviceFollower";
import { DeviceProblem } from "./DeviceProblem";
import { DeviceProblemStar } from "./DeviceProblemStar";
import { Review } from "./Review";
import { Solution } from "./Solution";
import { SolutionStar } from "./SolutionStar";

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

  @Field(() => [SolutionStar], { nullable: true })
  @OneToMany(() => SolutionStar, (star) => star.user)
  solutionStars: SolutionStar[];

  @Field(() => [DeviceFollower], { nullable: true })
  @OneToMany(() => DeviceFollower, (follow) => follow.user)
  follows: DeviceFollower[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.author)
  reviews: Review[];
}
