import { MyContext } from "src/types";
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
