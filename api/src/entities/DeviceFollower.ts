import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { Device } from "./Device";
import { User } from "./User";

@ObjectType()
@Entity()
export class DeviceFollower {
  @Field()
  @PrimaryColumn()
  userId: string;
  @ManyToOne(() => User, (user) => user.deviceProblemStars, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => String)
  @PrimaryColumn()
  deviceId: string;
  @ManyToOne(() => Device, (device) => device.followers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "deviceId" })
  device: Device;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
