import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Notification {
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
  @Column()
  link: string;

  @Field(() => String)
  @Column()
  category: string;

  @Field()
  @Column()
  userId: string;
  @ManyToOne(() => User, (user) => user.notifications, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @Field(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class NotificationResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [Notification], { nullable: true })
  data?: Notification[] | null;
}
