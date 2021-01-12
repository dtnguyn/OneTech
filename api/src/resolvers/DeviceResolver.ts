import { Device, DeviceResponse } from "../entities/Device";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { DeviceSpec, DeviceSpecResponse } from "../entities/DeviceSpec";
import { DeviceFollower } from "../entities/DeviceFollower";
import { MyContext } from "../types";

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

  @Field(() => String, { nullable: true })
  price?: string;
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

  @Field(() => String, { nullable: true })
  gpu?: string;

  @Field(() => String, { nullable: true })
  gpuSimplify?: string;

  @Field(() => String, { nullable: true })
  memory?: string;

  @Field(() => String, { nullable: true })
  memorySimplify?: string;

  @Field(() => String, { nullable: true })
  thermals?: string;

  @Field(() => String, { nullable: true })
  thermalsSimplify?: string;

  @Field(() => String, { nullable: true })
  ports?: string;

  @Field(() => String, { nullable: true })
  portsSimplify?: string;
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
@Resolver()
export class DeviceResolver {
  deviceRepo = getRepository(Device);
  specRepo = getRepository(DeviceSpec);
  followRepo = getRepository(DeviceFollower);

  @Mutation(() => DeviceResponse, { nullable: true })
  async createDevice(
    @Arg("name") name: string,
    @Arg("brand") brand: string,
    @Arg("category") category: string,
    @Arg("price", { nullable: true }) price: string,
    @Arg("subCategory", { nullable: true }) subCategory: string,
    @Arg("buyLink", { nullable: true }) buyLink: string,
    @Arg("coverImage", { nullable: true }) coverImage: string,
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
    processorSimplify: string | null,
    @Arg("gpu", () => String, { nullable: true })
    gpu: string | null,
    @Arg("gpu_simplify", () => String, { nullable: true })
    gpuSimplify: string | null,
    @Arg("memory", () => String, { nullable: true })
    memory: string | null,
    @Arg("memory_simplify", () => String, { nullable: true })
    memorySimplify: string | null,
    @Arg("thermals", () => String, { nullable: true })
    thermals: string | null,
    @Arg("thermals_simplify", () => String, { nullable: true })
    thermalsSimplify: string | null,
    @Arg("ports", () => String, { nullable: true })
    ports: string | null,
    @Arg("ports_simplify", () => String, { nullable: true })
    portsSimplify: string | null
  ) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const manager = queryRunner.manager;

      const newDevice = await manager.create(Device, {
        name,
        category,
        brand,
        buyLink,
        subCategory,
        coverImage,
      });

      await manager.insert(Device, newDevice);

      await manager.insert(DeviceSpec, {
        deviceId: newDevice.id,
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
        gpu,
        gpuSimplify,
        memory,
        memorySimplify,
        thermals,
        thermalsSimplify,
        ports,
        portsSimplify,
      } as DeviceSpec);

      await queryRunner.commitTransaction();
      queryRunner.release();

      return {
        status: true,
        message: "Create device successfully",
        data: [newDevice],
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => DeviceResponse)
  async updateDevice(
    @Arg("id") id: string,
    @Arg("deviceInput") deviceInput: UpdateDeviceInput,
    @Arg("specInput") specInput: UpdateDeviceSpecInput
  ) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const manager = queryRunner.manager;

      await manager.update(Device, { id }, deviceInput);

      await manager.update(DeviceSpec, { deviceId: id }, specInput);

      await queryRunner.commitTransaction();
      queryRunner.release();

      return {
        status: true,
        message: "Update device successfully",
      };
    } catch (error) {
      queryRunner.rollbackTransaction();
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => DeviceResponse)
  async deleteDevice(@Arg("id") id: string) {
    await this.deviceRepo.delete({ id }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Delete device successfully.",
    };
  }

  @Mutation(() => DeviceResponse)
  async toggleDeviceFollow(
    @Ctx() { req }: MyContext,
    @Arg("userId") userId: string,
    @Arg("deviceId") deviceId: string
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }
    const follow = await this.followRepo.findOne({ userId, deviceId });
    console.log("follow: ", follow);
    if (follow) {
      await this.followRepo.delete({ userId, deviceId }).catch((err) => {
        console.log("Error when un-follow device: ", err);
        return {
          status: false,
          message: err.message,
        };
      });
      return {
        status: true,
        message: "Un-follow device successfully.",
      };
    } else {
      const newFollow = this.followRepo.create({ userId, deviceId });
      await this.followRepo.save(newFollow).catch((err) => {
        console.log("Error when follow device: ", err);
        return {
          status: false,
          message: err.message,
        };
      });
      return {
        status: true,
        message: "Follow device successfully.",
      };
    }
  }

  @Query(() => DeviceResponse)
  async devices(
    @Arg("all", { nullable: true }) all: boolean,
    @Arg("category", { nullable: true }) category: string,
    @Arg("userId", { nullable: true }) userId: string,
    @Arg("name", { nullable: true }) name: string
  ) {
    try {
      const builder = this.deviceRepo
        .createQueryBuilder("device")
        .leftJoinAndSelect("device.followers", "followers")
        .leftJoinAndSelect("device.problems", "problems")
        .leftJoinAndSelect("device.reviews", "reviews");
      if (!all) {
        if (category)
          builder.where("device.category = :category", { category });
        if (userId) builder.andWhere("followers.userId = :userId", { userId });
        if (name)
          builder.andWhere("LOWER(device.name) LIKE LOWER(:name)", {
            name: "%" + name + "%",
          });
      }

      const devices = await builder.getMany();
      return {
        status: true,
        message: "Get devices successfully.",
        data: devices,
      };
    } catch (e) {
      return {
        status: false,
        message: e.message,
      };
    }
  }

  @Query(() => DeviceResponse, { nullable: true })
  async singleDevice(@Arg("id") id: string) {
    console.log("Getting single device");
    try {
      const device = await this.deviceRepo
        .createQueryBuilder("device")
        .leftJoinAndSelect("device.followers", "followers")
        .leftJoinAndSelect("device.spec", "spec")
        .where("device.id = :id", { id })
        .getOne();

      console.log("Got device detail");

      return {
        status: true,
        message: "Get a device successfully.",
        data: [device],
      };
    } catch (e) {
      console.log(e.message);
      return {
        status: false,
        message: e.message,
      };
    }
  }

  @Mutation(() => DeviceSpecResponse, { nullable: true })
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

    await this.specRepo.save(newSpec).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    return {
      status: true,
      message: "Create spec successfully.",
      data: [newSpec],
    };
  }

  @Mutation(() => DeviceSpecResponse)
  async updateDeviceSpec(
    @Arg("deviceId") deviceId: string,
    @Arg("input") input: UpdateDeviceSpecInput
  ) {
    await this.specRepo.update({ deviceId }, input).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    const deviceSpec = await this.specRepo.findOne({ deviceId }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Update spec successfully.",
      data: [deviceSpec],
    };
  }

  @Mutation(() => DeviceSpecResponse)
  async deleteDeviceSpec(@Arg("deviceId") deviceId: string) {
    await this.specRepo.delete({ deviceId }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    return {
      status: true,
      message: "Delete spec successfully.",
    };
  }
}
