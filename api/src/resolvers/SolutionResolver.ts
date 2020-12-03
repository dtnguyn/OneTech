import { Solution } from "../entities/Solution";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { SolutionStar } from "../entities/SolutionStar";

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

  @Query(() => [Solution])
  solutions() {
    return this.solutionRepo.find();
  }
}
