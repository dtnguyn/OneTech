import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { DeviceProblem } from "./DeviceProblem";

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

  @Field(() => [DeviceProblem], { nullable: true })
  @OneToMany(() => DeviceProblem, (deviceProblem) => deviceProblem.device)
  problems: DeviceProblem[];
}
