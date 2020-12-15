import { DeviceFollower } from "../entities/DeviceFollower";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getRepository } from "typeorm";
import { User, UserResponse } from "../entities/User";
import { UserSetting, UserSettingResponse } from "../entities/UserSetting";

@InputType()
class UpdateUserInput {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}

@InputType()
class UpdateSettingInput {
  @Field(() => Boolean, { nullable: true })
  isPrivate?: boolean;

  @Field(() => String, { nullable: true })
  isDarkMode?: boolean;
}

@Resolver()
export class UserResolver {
  userRepo = getRepository(User);
  followRepo = getRepository(DeviceFollower);
  settingRepo = getRepository(UserSetting);

  @Mutation(() => UserResponse)
  async updateUser(
    @Arg("id") id: string,
    @Arg("input") input: UpdateUserInput
  ) {
    await this.userRepo.update({ id }, input).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    const user = await this.userRepo.findOne({ id }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Update user successfully.",
      data: [user],
    };
  }

  @Mutation(() => UserResponse)
  async deleteUser(@Arg("id") id: string) {
    await this.userRepo.delete({ id }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    return {
      status: true,
      message: "Delete user successfully.",
    };
  }

  @Query(() => UserResponse)
  async users() {
    const users = await this.userRepo.find().catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    return {
      status: true,
      message: "Getting users successfully.",
      data: users,
    };
  }

  @Query(() => UserResponse)
  async singleUser(@Arg("id") id: string) {
    const user = await this.userRepo.findOne({ id }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Getting users successfully.",
      data: [user],
    };
  }

  @Query(() => UserResponse, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    const user = await this.userRepo
      .findOne({ id: (req.session as any).userId })
      .catch((e) => {
        return {
          status: false,
          message: e.message,
        };
      });

    if (user) {
      return {
        status: true,
        message: "User already logged in.",
        data: [user],
      };
    } else {
      return {
        status: false,
        message: "User not logged in.",
      };
    }
  }

  @Mutation(() => UserSettingResponse)
  async createSetting(@Arg("userId") userId: string) {
    const setting = this.settingRepo.create({ userId });
    await this.settingRepo.save(setting).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    return {
      status: true,
      message: "Create settings successfully.",
      data: [setting],
    };
  }

  @Mutation(() => UserSetting)
  async updateSetting(
    @Arg("userId") userId: string,
    @Arg("input") input: UpdateSettingInput
  ) {
    await this.settingRepo.update({ userId }, input).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    const setting = await this.settingRepo.findOne({ userId }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Update setting successfully.",
      data: [setting],
    };
  }

  @Query(() => UserSettingResponse, { nullable: true })
  async setting(@Arg("userId") userId: string) {
    const setting = await this.settingRepo.findOne({ userId }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Get setting successfully.",
      data: [setting],
    };
  }
}
