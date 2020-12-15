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
import { DeviceSpec } from "./DeviceSpec";
import { Review } from "./Review";
import { ReviewRating } from "./ReviewRating";

@ObjectType()
@Entity()
export class Device {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  category: string;

  @Field(() => String, { nullable: true })
  @Column({ unique: true, nullable: true })
  buyLink?: string;

  @Field(() => String)
  @Column({ nullable: true })
  coverImage?: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => DeviceSpec, { nullable: true })
  @OneToOne(() => DeviceSpec, (spec) => spec.device)
  spec: DeviceSpec;

  @Field(() => [DeviceProblem], { nullable: true })
  @OneToMany(() => DeviceProblem, (deviceProblem) => deviceProblem.device)
  problems: DeviceProblem[];

  @Field(() => [DeviceFollower], { nullable: true })
  @OneToMany(() => DeviceFollower, (follower) => follower.device)
  followers: DeviceFollower[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.device)
  reviews: Review[];

  @Field(() => [ReviewRating], { nullable: true })
  @OneToMany(() => ReviewRating, (rating) => rating.device)
  ratings: ReviewRating[];
}

@ObjectType()
export class DeviceResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [Device], { nullable: true })
  data?: Device[] | null;
}
