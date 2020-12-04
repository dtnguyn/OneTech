import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";

import { DeviceProblem } from "../entities/DeviceProblem";
import { DeviceProblemStar } from "../entities/DeviceProblemStar";

@InputType()
class UpdateProblemInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Boolean, { nullable: true })
  isSolve?: boolean;
}

@Resolver()
export class ProblemResolver {
  problemRepo = getRepository(DeviceProblem);
  starRepo = getRepository(DeviceProblemStar);

  @Mutation(() => DeviceProblem, { nullable: true })
  async createProblem(
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("authorId") authorId: string,
    @Arg("deviceId") deviceId: string
  ) {
    const newProblem = await this.problemRepo.create({
      title,
      content,
      authorId,
      deviceId,
    });

    await this.problemRepo.save(newProblem).catch(() => {
      return null;
    });
    return newProblem;
  }

  @Mutation(() => Boolean)
  async deleteProblem(@Arg("id") id: string) {
    await this.problemRepo.delete({ id });
    return true;
  }

  @Mutation(() => DeviceProblem)
  async updateProblem(
    @Arg("id") id: string,
    @Arg("input") input: UpdateProblemInput
  ) {
    await this.problemRepo.update({ id }, input);
    return this.problemRepo.findOne({ id });
  }

  @Query(() => [DeviceProblem])
  problems(@Arg("deviceId") deviceId: string) {
    return this.problemRepo.find({ deviceId });
  }

  @Query(() => DeviceProblem)
  singleProblem(@Arg("id") id: string) {
    return this.problemRepo
      .createQueryBuilder("problem")
      .leftJoinAndSelect("problem.stars", "problemStars")
      .leftJoinAndSelect("problem.solutions", "solutions")
      .leftJoinAndSelect("solutions.stars", "solutionStars")
      .where("problem.id = :id", { id });
  }

  @Mutation(() => Boolean)
  async toggleProblemStar(
    @Arg("userId") userId: string,
    @Arg("problemId") problemId: string
  ) {
    const star = await this.starRepo.findOne({ userId, problemId });
    console.log("star: ", star);
    if (star) {
      await this.starRepo.delete({ userId, problemId }).catch((err) => {
        console.log("Error when star problem: ", err);
        return false;
      });
      return true;
    } else {
      const newStar = this.starRepo.create({ userId, problemId });
      await this.starRepo.save(newStar).catch((err) => {
        console.log("Error when star problem: ", err);
        return false;
      });
      return true;
    }
  }

  @Query(() => [DeviceProblemStar])
  findProblemStars(@Arg("problemId") problemId: string) {
    return this.starRepo.find({ problemId });
  }
}
