import { Solution } from "../entities/Solution";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";

@Resolver()
export class SolutionResolver {
  solutionRepo = getRepository(Solution);

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

  @Query(() => [Solution])
  solutions() {
    return this.solutionRepo.find();
  }
}
