import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { DeviceFollower } from "./DeviceFollower";
import { DeviceProblem } from "./DeviceProblem";
import { DeviceProblemStar } from "./DeviceProblemStar";
import { Notification } from "./Notification";
import { Report } from "./Report";
import { Review } from "./Review";
import { Solution } from "./Solution";
import { SolutionStar } from "./SolutionStar";
import { UserSetting } from "./UserSetting";

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

  @Field(() => UserSetting, { nullable: true })
  @OneToOne(() => UserSetting, (setting) => setting.user)
  setting: UserSetting;

  @Field(() => [Report], { nullable: true })
  @OneToMany(() => Report, (report) => report.author)
  reports: Report[];

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

  @Field(() => [Notification], { nullable: true })
  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @Field(() => [DeviceFollower], { nullable: true })
  @OneToMany(() => DeviceFollower, (follow) => follow.user)
  follows: DeviceFollower[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.author)
  reviews: Review[];

  @Field(() => [DeviceProblem], { nullable: true })
  @OneToMany(() => DeviceProblem, (problem) => problem.solver)
  problemSolved: DeviceProblem[];
}

@ObjectType()
export class UserResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [User], { nullable: true })
  data?: User[] | null;
}
