import { Field, Float, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Device } from "./Device";
import { Review } from "./Review";

@ObjectType()
@Entity()
export class ReviewRating {
  @Field()
  @PrimaryColumn()
  reviewId: string;
  @OneToOne(() => Review, (review) => review.rating, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "reviewId" })
  review: Review;

  @Field()
  @Column()
  deviceId: string;
  @ManyToOne(() => Device, (device) => device.ratings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "deviceId" })
  device: Device;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  overall: number | null;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  display: number | null;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  battery: number | null;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  software: number | null;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  camera: number | null;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  processor: number | null;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  gpu: number | null;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  memory: number | null;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  thermals: number | null;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  ports: number | null;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class ReviewRatingResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [ReviewRating], { nullable: true })
  data?: ReviewRating[] | null;
}
