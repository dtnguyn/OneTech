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
import { Review } from "./Review";

@ObjectType()
@Entity()
export class ReviewImage {
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
  reviewId: string;
  @ManyToOne(() => Review, (review) => review.images, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @Field(() => Review)
  @JoinColumn({ name: "reviewId" })
  review: Review;
}

@ObjectType()
export class ReviewImageResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [ReviewImage], { nullable: true })
  data?: ReviewImage[] | null;
}
