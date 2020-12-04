import { Solution } from "../entities/Solution";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { SolutionStar } from "../entities/SolutionStar";

@InputType()
class UpdateSolutionInput {
  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Boolean, { nullable: true })
  isPicked?: boolean;
}

@Resolver()
export class SolutionResolver {
  solutionRepo = getRepository(Solution);
  starRepo = getRepository(SolutionStar);

  @Mutation(() => Solution)
  async createSolution(
    @Arg("content") content: string,
    @Arg("authorId") authorId: string,
    @Arg("problemId") problemId: string
  ) {
    const solution = await this.solutionRepo.create({
      content,
      authorId,
      problemId,
    });
    await this.solutionRepo.save(solution);
    return solution;
  }

  @Mutation(() => Solution)
  async updateSolution(
    @Arg("id") id: string,
    @Arg("input") input: UpdateSolutionInput
  ) {
    await this.solutionRepo.update({ id }, input);
    return await this.solutionRepo.findOne({ id });
  }

  @Mutation(() => Boolean)
  async deleteSolution(@Arg("id") id: string) {
    await this.solutionRepo.delete({ id });
    return true;
  }

  @Query(() => [Solution])
  solutions(@Arg("problemId") problemId: string) {
    return this.solutionRepo.find({ problemId });
  }

  @Query(() => [Solution])
  singleSolution(@Arg("id") id: string) {
    return this.solutionRepo.findOne({ id });
  }

  @Mutation(() => Boolean)
  async toggleSolutionStar(
    @Arg("userId") userId: string,
    @Arg("solutionId") solutionId: string
  ) {
    const star = await this.starRepo.findOne({ userId, solutionId });
    console.log("star: ", star);
    if (star) {
      await this.starRepo.delete({ userId, solutionId }).catch((err) => {
        console.log("Error when star solution: ", err);
        return false;
      });
      return true;
    } else {
      const newStar = this.starRepo.create({ userId, solutionId });
      await this.starRepo.save(newStar).catch((err) => {
        console.log("Error when star solution: ", err);
        return false;
      });
      return true;
    }
  }

  @Query(() => [SolutionStar])
  findSolutionStars(@Arg("solutionId") solutionId: string) {
    return this.starRepo.find({ solutionId });
  }
}
