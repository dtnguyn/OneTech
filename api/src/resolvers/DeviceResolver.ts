import { Device } from "../entities/Device";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { DeviceSpec } from "../entities/DeviceSpec";

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

@InputType()
class UpdateDeviceSpecInput {
  @Field(() => String, { nullable: true })
  display?: string;

  @Field(() => String, { nullable: true })
  displaySimplify?: string;

  @Field(() => String, { nullable: true })
  battery?: string;

  @Field(() => String, { nullable: true })
  batterySimplify?: string;

  @Field(() => String, { nullable: true })
  software?: string;

  @Field(() => String, { nullable: true })
  softwareSimplify?: string;

  @Field(() => String, { nullable: true })
  processor?: string;

  @Field(() => String, { nullable: true })
  processorSimplify?: string;

  @Field(() => String, { nullable: true })
  camera?: string;

  @Field(() => String, { nullable: true })
  cameraSimplify?: string;
}

@Resolver()
export class DeviceResolver {
  deviceRepo = getRepository(Device);
  specRepo = getRepository(DeviceSpec);

  @Mutation(() => Device, { nullable: true })
  async createDevice(
    @Arg("name") name: string,
    @Arg("category") category: string,
    @Arg("buyLink", { nullable: true }) buyLink: string,
    @Arg("coverImage", { nullable: true }) coverImage: string
  ) {
    const newDevice = this.deviceRepo.create({
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
  devices(@Arg("category") category: string) {
    return this.deviceRepo
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.followers", "followers")
      .leftJoinAndSelect("device.problems", "problems")
      .leftJoinAndSelect("device.reviews", "reviews")
      .where("device.category = :category", { category })
      .getMany();
  }

  @Query(() => Device, { nullable: true })
  singleDevice(@Arg("id") id: string) {
    return this.deviceRepo
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.problems", "problems")
      .leftJoinAndSelect("problems.stars", "stars")
      .leftJoinAndSelect("problems.solutions", "solutions")
      .leftJoinAndSelect("device.spec", "spec")
      .leftJoinAndSelect("device.reviews", "reviews")
      .leftJoinAndSelect("reviews.rating", "rating")
      .where("device.id = :id", { id })
      .getOne();
  }

  @Mutation(() => DeviceSpec, { nullable: true })
  async createSpec(
    @Arg("deviceId") deviceId: string,
    @Arg("display", () => String, { nullable: true }) display: string | null,
    @Arg("display_simplify", () => String, { nullable: true })
    displaySimplify: string | null,
    @Arg("battery", () => String, { nullable: true }) battery: string | null,
    @Arg("battery_simplify", () => String, { nullable: true })
    batterySimplify: string | null,
    @Arg("software", () => String, { nullable: true }) software: string | null,
    @Arg("software_simplify", () => String, { nullable: true })
    softwareSimplify: string | null,
    @Arg("camera", () => String, { nullable: true }) camera: string | null,
    @Arg("camera_simplify", () => String, { nullable: true })
    cameraSimplify: string | null,
    @Arg("processor", () => String, { nullable: true })
    processor: string | null,
    @Arg("processor_simplify", () => String, { nullable: true })
    processorSimplify: string | null
  ) {
    const newSpec = this.specRepo.create({
      deviceId,
      display,
      displaySimplify,
      battery,
      batterySimplify,
      software,
      softwareSimplify,
      camera,
      cameraSimplify,
      processor,
      processorSimplify,
    } as DeviceSpec);

    await this.specRepo.save(newSpec).catch(() => {
      return null;
    });
    return newSpec;
  }

  @Mutation(() => DeviceSpec)
  async updateDeviceSpec(
    @Arg("deviceId") deviceId: string,
    @Arg("input") input: UpdateDeviceSpecInput
  ) {
    await this.specRepo.update({ deviceId }, input);
    return await this.specRepo.findOne({ deviceId });
  }

  @Mutation(() => Boolean)
  async deleteDeviceSpec(@Arg("deviceId") deviceId: string) {
    await this.specRepo.delete({ deviceId });
    return true;
  }
}
