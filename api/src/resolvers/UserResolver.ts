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
  async createAdminUsers(@Arg("adminId") adminId: string) {
    if (adminId !== process.env.ADMIN_ID)
      return {
        status: false,
        message: "Admin id is incorrect.",
      };
    const names = [
      "Sebastian Wormald",
      "Raiden Mullins",
      "Kyal Clay",
      "Kit Dunlap",
      "Nathanial Dawson",
      "Joss Camacho",
      "Lester Torres",
      "Dominik Dupont",
      "Gilbert Kirkland",
      "Bentley Bains",
      "Andy Healy",
      "Matei Findlay",
      "Sonnie Nicholson",
      "Joy Ritter",
      "Samir Galindo",
      "Robyn Bowler",
      "Keon Vargas",
      "Vihaan Glass",
      "Trevor Cassidy",
      "Woodrow Fleming",
      "Lilly-Rose Mcdermott",
      "Kyla Cotton",
      "Jazmin Adams",
      "Ellesha Goddard",
      "Samia Bishop",
      "Maheen Chamberlain",
      "Lynn Broughton",
      "Sabiha Hogg",
      "Francis Noble",
      "Haleemah Allison",
    ];

    const emails = [
      "sebastianwormald@gmail.com",
      "raidenmullins@gmail.com",
      "kyalclay@gmail.com",
      "kitdunlap@gmail.com",
      "nathanialdawson@gmail.com",
      "josscamacho@gmail.com",
      "lestertorres@gmail.com",
      "dominikdupont@gmail.com",
      "gilbertkirkland@gmail.com",
      "bentleybains@gmail.com",
      "andyhealy@gmail.com",
      "mateifindlay@gmail.com",
      "sonnienicholson@gmail.com",
      "joyritter@gmail.com",
      "samirgalindo@gmail.com",
      "robynbowler@gmail.com",
      "keonvargas@gmail.com",
      "vihaanglass@gmail.com",
      "trevorcassidy@gmail.com",
      "woodrowfleming@gmail.com",
      "lillymcdermott@gmail.com",
      "kylacotton@gmail.com",
      "jazminadams@gmail.com",
      "elleshagoddard@gmail.com",
      "samiabishop@gmail.com",
      "maheenchamberlain@gmail.com",
      "lynnbroughton@gmail.com",
      "sabihahogg@gmail.com",
      "francisnoble@gmail.com",
      "haleemahallison@gmail.com",
    ];

    const avatars = [
      "https://storage.googleapis.com/one_tech_bucket/user_images/SebastianWormald.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/RaidenMullins.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/KyalClay.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/KitDunlap.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/NathanialDawson.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/JossCamacho.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/LesterTorres.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/DominikDupont.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/GilbertKirkland.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/BentleyBains.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/AndyHealy.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/MateiFindlay.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/SonnieNicholson.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/JoyRitter.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/SamirGalindo.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/RobynBowler.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/KeonVargas.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/VihaanGlass.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/TrevorCassidy.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/WoodrowFleming.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/Lilly-RoseMcdermott.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/KylaCotton.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/JazminAdams.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/ElleshaGoddard.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/SamiaBishop.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/MaheenChamberlain.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/LynnBroughto.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/SabihaHogg.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/FrancisNoble.jpeg",
      "https://storage.googleapis.com/one_tech_bucket/user_images/HaleemahAllison.jpeg",
    ];
    try {
      for (let i = 0; i < names.length; i++) {
        const newUser = this.userRepo.create({
          oauthId: `admin${i}`,
          email: emails[i],
          username: names[i],
          avatar: avatars[i],
        });

        await this.userRepo.insert(newUser);
        await this.settingRepo.insert({ userId: newUser.id });
      }
      return {
        status: true,
        message: "Create admin users successfully.",
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => UserResponse)
  async loginAdmin(
    @Ctx() { req }: MyContext,
    @Arg("userId") userId: string,
    @Arg("adminId") adminId: string
  ) {
    if (adminId !== process.env.ADMIN_ID)
      return {
        status: false,
        message: "adminId is incorrect.",
      };

    const user = await this.userRepo.findOne({ id: userId });
    if (user && user.oauthId.includes("admin")) {
      (req.session as any).userId = userId;
      return {
        status: true,
        message: "Log in as user admin successfully.",
      };
    } else
      return {
        status: false,
        message: "The user doesn't not exist or not an admin.",
      };
  }

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
        .leftJoinAndSelect("user.problems", "problems")
        .leftJoinAndSelect("problems.stars", "problemStar")
        .leftJoinAndSelect("user.solutions", "solutions")
        .leftJoinAndSelect("solutions.stars", "solutionStar")
        .leftJoinAndSelect("user.problemSolved", "solved")
        .where("user.id = :id", { id })
        .getOne();

      // console.log("Debug: ", id, user);
      return {
        status: true,
        message: "Getting users successfully.",
        data: [user],
      };
    } catch (error) {
      console.log(error.message);
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Query(() => UserResponse, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    console.log(req.headers);
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
