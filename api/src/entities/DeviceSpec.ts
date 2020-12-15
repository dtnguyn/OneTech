import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Device } from "./Device";

@ObjectType()
@Entity()
export class DeviceSpec {
  @Field()
  @PrimaryColumn()
  deviceId: string;
  @OneToOne(() => Device, (device) => device.spec, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "deviceId" })
  device: Device;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  display?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  displaySimplify?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  battery?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  batterySimplify?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  software?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  softwareSimplify?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  camera?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  cameraSimplify?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  processor?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  processorSimplify?: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class DeviceSpecResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => [DeviceSpec], { nullable: true })
  data?: DeviceSpec[] | null;
}
