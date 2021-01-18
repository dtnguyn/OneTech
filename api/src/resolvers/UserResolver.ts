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

  @Field(() => Boolean, { nullable: true })
  notifications?: boolean;
}

@Resolver()
export class UserResolver {
  userRepo = getRepository(User);
  followRepo = getRepository(DeviceFollower);
  settingRepo = getRepository(UserSetting);

  @Mutation(() => UserResponse)
  async deleteUser(@Arg("id") id: string, @Arg("adminId") adminId: string) {
    if (adminId === process.env.ADMIN_ID) {
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
    } else {
      return {
        status: false,
        message: "Invalid admin Id",
      };
    }
  }

  @Mutation(() => UserResponse)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          resolve({
            status: false,
            message: err.message,
          });
          return;
        }
        res.clearCookie("qid");
        resolve({
          status: true,
          message: "Successfully logout.",
        });
      });
    });
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
    try {
      const user = await this.userRepo
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.setting", "setting")
        .where("user.id = :id", { id })
        .getOne();

      return {
        status: true,
        message: "Getting users successfully.",
        data: [user],
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Query(() => UserResponse, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    const user = await this.userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.setting", "setting")
      .leftJoinAndSelect("user.problems", "problems")
      .leftJoinAndSelect("problems.stars", "problemStar")
      .leftJoinAndSelect("user.solutions", "solutions")
      .leftJoinAndSelect("solutions.stars", "solutionStar")
      .leftJoinAndSelect("user.problemSolved", "solved")
      .where("user.id = :id", { id: (req.session as any).userId })
      .getOne();

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

  @Mutation(() => UserSettingResponse)
  async updateSetting(
    @Ctx() { req }: MyContext,
    @Arg("userId") userId: string,
    @Arg("input") input: UpdateSettingInput
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }

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
