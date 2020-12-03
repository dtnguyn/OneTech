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
import { User } from "../entities/User";

@InputType()
class UpdateUserInput {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}

@Resolver()
export class UserResolver {
  userRepo = getRepository(User);
  followRepo = getRepository(DeviceFollower);

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("input") input: UpdateUserInput
  ) {
    await this.userRepo.update({ id }, input);
    return await this.userRepo.findOne({ id });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    await this.userRepo.delete({ id });
    return true;
  }

  @Mutation(() => Boolean)
  async toggleDeviceFollow(
    @Arg("userId") userId: string,
    @Arg("deviceId") deviceId: string
  ) {
    const follow = await this.followRepo.findOne({ userId, deviceId });
    console.log("follow: ", follow);
    if (follow) {
      await this.followRepo.delete({ userId, deviceId }).catch((err) => {
        console.log("Error when follow device: ", err);
        return false;
      });
      return true;
    } else {
      const newFollow = this.followRepo.create({ userId, deviceId });
      await this.followRepo.save(newFollow).catch((err) => {
        console.log("Error when follow device: ", err);
        return false;
      });
      return true;
    }
  }

  @Query(() => [User])
  users() {
    return this.userRepo.find();
  }

  @Query(() => User)
  singleUser(@Arg("id") id: string) {
    return this.userRepo.find({ id });
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, res }: MyContext) {
    return await this.userRepo.findOne({ id: (req.session as any).userId });
  }
}
