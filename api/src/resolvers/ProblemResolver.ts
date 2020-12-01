import e from "express";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";

import { DeviceProblem } from "../entities/DeviceProblem";
import { DeviceProblemStar } from "../entities/DeviceProblemStar";

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

  @Query(() => [DeviceProblem])
  problems() {
    return this.problemRepo.find();
  }

  @Query(() => DeviceProblem)
  singleProblem(@Arg("id") id: string) {
    return this.problemRepo.find({ id });
  }

  @Query(() => [DeviceProblemStar])
  findStars() {
    return this.starRepo.find();
  }
}
