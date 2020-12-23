import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";

import { DeviceProblem, ProblemResponse } from "../entities/DeviceProblem";
import {
  DeviceProblemStar,
  ProblemStarResponse,
} from "../entities/DeviceProblemStar";

@InputType()
class UpdateProblemInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Boolean, { nullable: true })
  isSolve?: boolean;
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
@Resolver()
export class ProblemResolver {
  problemRepo = getRepository(DeviceProblem);
  starRepo = getRepository(DeviceProblemStar);

  @Mutation(() => ProblemResponse, { nullable: true })
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

    await this.problemRepo.save(newProblem).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    return {
      status: true,
      message: "Create problem successfully.",
      data: [newProblem],
    };
  }

  @Mutation(() => ProblemResponse)
  async deleteProblem(@Arg("id") id: string) {
    await this.problemRepo.delete({ id }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    return {
      status: true,
      message: "Delete problem successfully.",
    };
  }

  @Mutation(() => ProblemResponse)
  async updateProblem(
    @Arg("id") id: string,
    @Arg("input") input: UpdateProblemInput
  ) {
    await this.problemRepo.update({ id }, input).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    const problem = this.problemRepo.findOne({ id }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Update problem successfully.",
      data: [problem],
    };
  }

  @Query(() => ProblemResponse, { nullable: true })
  async problems(
    @Arg("deviceId", { nullable: true }) deviceId: string,
    @Arg("authorId", { nullable: true }) authorId: string,
    @Arg("title", { nullable: true }) title: string,
    @Arg("content", { nullable: true }) content: string
  ) {
    try {
      //await sleep(3000);
      const builder = this.problemRepo.createQueryBuilder("problem");
      builder
        .leftJoinAndSelect("problem.author", "author")
        .leftJoinAndSelect("problem.stars", "stars")
        .leftJoinAndSelect("problem.solutions", "solutions");
      if (authorId) builder.where("problem.authorId = :authorId", { authorId });
      if (deviceId) builder.where("problem.deviceId = :deviceId", { deviceId });

      if (title && content) {
        builder
          .andWhere("LOWER(problem.title) LIKE LOWER(:title)", {
            title: "%" + title + "%",
          })
          .orWhere("LOWER(problem.content) LIKE LOWER(:content)", {
            content: "%" + content + "%",
          });
      } else if (title)
        builder.andWhere("LOWER(problem.title) LIKE LOWER(:title)", {
          title: "%" + title + "%",
        });
      else if (content)
        builder.andWhere("LOWER(problem.content) LIKE LOWER(:content)", {
          content: "%" + content + "%",
        });

      const problems = await builder.getMany();
      console.log("problems: ", problems);
      return {
        status: true,
        message: "Get problems successfully.",
        data: problems,
      };
    } catch (e) {
      return {
        status: false,
        message: e.message,
      };
    }
  }

  @Query(() => ProblemResponse)
  async singleProblem(@Arg("id") id: string) {
    try {
      const problem = await this.problemRepo
        .createQueryBuilder("problem")
        .leftJoinAndSelect("problem.stars", "problemStars")
        .leftJoinAndSelect("problem.solutions", "solutions")
        .leftJoinAndSelect("solutions.stars", "solutionStars")
        .where("problem.id = :id", { id })
        .getOne();

      return {
        status: true,
        message: "Get a problem successfully",
        data: [problem],
      };
    } catch (e) {
      return {
        status: false,
        message: e.message,
      };
    }
  }

  @Mutation(() => ProblemResponse)
  async toggleProblemStar(
    @Arg("userId") userId: string,
    @Arg("problemId") problemId: string
  ) {
    const star = await this.starRepo.findOne({ userId, problemId });
    console.log("star: ", star);
    if (star) {
      await this.starRepo.delete({ userId, problemId }).catch((err) => {
        console.log("Error when star problem: ", err);
        return {
          status: false,
          message: err.message,
        };
      });
      return {
        status: true,
        message: "Un-star problem successfully.",
      };
    } else {
      const newStar = this.starRepo.create({ userId, problemId });
      await this.starRepo.save(newStar).catch((err) => {
        console.log("Error when star problem: ", err);
        return {
          status: false,
          message: err.message,
        };
      });
      return {
        status: true,
        message: "Star problem successfully.",
      };
    }
  }

  @Query(() => ProblemStarResponse)
  async findProblemStars(@Arg("problemId") problemId: string) {
    const stars = await this.starRepo.find({ problemId }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Get problem stars successfully.",
      data: stars,
    };
  }
}
