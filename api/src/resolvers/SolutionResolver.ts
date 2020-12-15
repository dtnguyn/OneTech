import { Solution, SolutionResponse } from "../entities/Solution";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { SolutionStar, SolutionStarResponse } from "../entities/SolutionStar";

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

  @Mutation(() => SolutionResponse)
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
    await this.solutionRepo.save(solution).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Create solution successfully.",
      data: [solution],
    };
  }

  @Mutation(() => SolutionResponse)
  async updateSolution(
    @Arg("id") id: string,
    @Arg("input") input: UpdateSolutionInput
  ) {
    await this.solutionRepo.update({ id }, input).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    const solution = await this.solutionRepo.findOne({ id }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Update solution successfully.",
      data: [solution],
    };
  }

  @Mutation(() => SolutionResponse)
  async deleteSolution(@Arg("id") id: string) {
    await this.solutionRepo.delete({ id }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    return {
      status: true,
      message: "Delete solution successfully.",
    };
  }

  @Query(() => SolutionResponse)
  async solutions(
    @Arg("problemId", { nullable: true }) problemId: string,
    @Arg("userId", { nullable: true }) userId: string
  ) {
    try {
      const builder = this.solutionRepo.createQueryBuilder("solution");
      if (problemId)
        builder.where("solution.problemId = :problemId", { problemId });
      if (userId) builder.where("solution.authorId = :userId", { userId });

      const solutions = await builder.getMany();

      return {
        status: true,
        message: "Get solutions successfully.",
        data: solutions,
      };
    } catch (e) {
      return {
        status: false,
        message: e.message,
      };
    }
  }

  @Query(() => SolutionResponse)
  async singleSolution(@Arg("id") id: string) {
    const solution = await this.solutionRepo.findOne({ id }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Get solution successfully.",
      data: [solution],
    };
  }

  @Mutation(() => SolutionResponse)
  async toggleSolutionStar(
    @Arg("userId") userId: string,
    @Arg("solutionId") solutionId: string
  ) {
    const star = await this.starRepo.findOne({ userId, solutionId });
    console.log("star: ", star);
    if (star) {
      await this.starRepo.delete({ userId, solutionId }).catch((err) => {
        console.log("Error when star solution: ", err);
        return {
          status: false,
          message: err.message,
        };
      });
      return {
        status: true,
        message: "Un-star solution successfully.",
      };
    } else {
      const newStar = this.starRepo.create({ userId, solutionId });
      await this.starRepo.save(newStar).catch((err) => {
        console.log("Error when star solution: ", err);
        return {
          status: false,
          message: err.message,
        };
      });
      return {
        status: true,
        message: "Star solution successfully.",
      };
    }
  }

  @Query(() => SolutionStarResponse)
  async findSolutionStars(@Arg("solutionId") solutionId: string) {
    const stars = await this.starRepo.find({ solutionId }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Get solution stars successfully.",
      data: stars,
    };
  }
}
