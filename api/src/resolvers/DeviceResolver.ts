import { Device } from "../entities/Device";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";

import { DeviceProblem } from "../entities/DeviceProblem";

@InputType()
class UpdateDeviceInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => String, { nullable: true })
  buyLink?: string;

  @Field(() => String, { nullable: true })
  coverImage?: string;
}

@Resolver()
export class DeviceResolver {
  deviceRepo = getRepository(Device);

  @Mutation(() => Device, { nullable: true })
  async createDevice(
    @Arg("name") name: string,
    @Arg("category") category: string,
    @Arg("buyLink", { nullable: true }) buyLink: string,
    @Arg("coverImage", { nullable: true }) coverImage: string
  ) {
    const newDevice = await this.deviceRepo.create({
      name,
      category,
      buyLink,
      coverImage,
    });

    console.log("new device: ", newDevice);
    await this.deviceRepo.save(newDevice).catch(() => {
      return null;
    });
    return newDevice;
  }

  @Mutation(() => Device)
  async updateDevice(
    @Arg("id") id: string,
    @Arg("input") input: UpdateDeviceInput
  ) {
    await this.deviceRepo.update({ id }, input);
    return await this.deviceRepo.findOne({ id });
  }

  @Mutation(() => Boolean)
  async deleteDevice(@Arg("id") id: string) {
    await this.deviceRepo.delete({ id });
    return true;
  }

  @Query(() => [Device])
  devices() {
    return this.deviceRepo.find();
  }

  @Query(() => Device, { nullable: true })
  async singleDevice(@Arg("id") id: string) {
    const device = await this.deviceRepo
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.problems", "problems")
      .leftJoinAndSelect("problems.stars", "stars")
      .leftJoinAndSelect("problems.solutions", "solutions")
      .where("device.id = :id", { id })
      .getOne();
    console.log("device: ", device);

    return device;
  }
}
