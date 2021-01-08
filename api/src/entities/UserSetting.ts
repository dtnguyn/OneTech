import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryColumn,
  Column,
  OneToOne,
} from "typeorm";

import { User } from "./User";

@ObjectType()
@Entity()
export class UserSetting {
  @Field()
  @PrimaryColumn()
  userId: string;
  @OneToOne(() => User, (user) => user.setting, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => Boolean)
  @Column({ default: "false" })
  isPrivate: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class UserSettingResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [UserSetting], { nullable: true })
  data?: UserSetting[] | null;
}
