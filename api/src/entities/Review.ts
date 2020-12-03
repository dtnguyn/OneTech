import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Device } from "./Device";
import { ReviewRating } from "./ReviewRating";
import { User } from "./User";

@ObjectType()
@Entity()
export class Review {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => ReviewRating)
  @OneToOne(() => ReviewRating, (rating) => rating.review)
  rating: ReviewRating;

  @Field()
  @Column()
  authorId: string;
  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "authorId" })
  author: User;

  @Field()
  @Column()
  deviceId: string;
  @ManyToOne(() => Device, (device) => device.reviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "deviceId" })
  device: Device;
}
