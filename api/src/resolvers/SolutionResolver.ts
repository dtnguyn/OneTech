import { Solution, SolutionResponse } from "../entities/Solution";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { SolutionStar, SolutionStarResponse } from "../entities/SolutionStar";
import { SolutionImage } from "../entities/SolutionImage";
import { DeviceProblem } from "../entities/DeviceProblem";
import { MyContext } from "../types";

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
    @Ctx() { req }: MyContext,
    @Arg("content") content: string,
    @Arg("authorId") authorId: string,
    @Arg("problemId") problemId: string,
    @Arg("images", () => [String]) images: string[]
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }

    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const manager = queryRunner.manager;
      const solution = await manager.create(Solution, {
        content,
        authorId,
        problemId,
      });

      await manager.insert(Solution, solution);

      if (images.length) {
        await new Promise((resolve, reject) => {
          let counter = 0;
          for (const image of images) {
            manager
              .insert(SolutionImage, {
                path: image,
                solutionId: solution.id,
              })
              .then(() => {
                counter++;
                if (counter === images.length) {
                  resolve(true);
                }
              })
              .catch((error) => {
                reject(error);
              });
          }
        });
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        status: true,
        message: "Create solution successfully.",
        data: [solution],
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => SolutionResponse)
  async updateSolution(
    @Ctx() { req }: MyContext,
    @Arg("id") id: string,
    @Arg("input") input: UpdateSolutionInput,
    @Arg("images", () => [String]) images: string[]
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }

    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const manager = queryRunner.manager;
      await manager.update(Solution, { id }, input);

      if (images.length) {
        await new Promise((resolve, reject) => {
          let counter = 0;
          for (const image of images) {
            manager
              .insert(SolutionImage, {
                path: image,
                solutionId: id,
              })
              .then(() => {
                counter++;
                if (counter === images.length) {
                  resolve(true);
                }
              })
              .catch((error) => {
                reject(error);
              });
          }
        });
      }

      const solution = await manager.findOne(Solution, { id });

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        status: true,
        message: "Create solution successfully.",
        data: [solution],
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => SolutionResponse)
  async deleteSolution(@Ctx() { req }: MyContext, @Arg("id") id: string) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }

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
      const builder = this.solutionRepo
        .createQueryBuilder("solution")
        .leftJoinAndSelect("solution.stars", "stars")
        .orderBy("solution.createdAt", "DESC")
        .leftJoinAndSelect("solution.author", "author")
        .leftJoinAndSelect("solution.images", "images");
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
    @Ctx() { req }: MyContext,
    @Arg("userId") userId: string,
    @Arg("solutionId") solutionId: string
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }

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

  @Mutation(() => SolutionResponse)
  async toggleSolutionPicked(
    @Ctx() { req }: MyContext,
    @Arg("problemId") problemId: string,
    @Arg("solutionId") solutionId: string,
    @Arg("solverId") solverId: string
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }

    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const manager = queryRunner.manager;
      const problem = await manager.findOne(DeviceProblem, { id: problemId });
      if (problem?.solvedBy) {
        //Unpicked
        if (problem.pickedSolutionId === solutionId) {
          await manager.update(
            DeviceProblem,
            { id: problemId },
            {
              solvedBy: null,
              pickedSolutionId: null,
            }
          );

          await manager.update(
            Solution,
            { id: solutionId },
            {
              isPicked: false,
            }
          );
        } else {
          throw new Error(
            "This problem is already solved by another solution."
          );
        }
      } else {
        //Picked
        await manager.update(
          DeviceProblem,
          { id: problemId },
          {
            solvedBy: solverId,
            pickedSolutionId: solutionId,
          }
        );

        await manager.update(
          Solution,
          { id: solutionId },
          {
            isPicked: true,
          }
        );
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        status: true,
        message: "Toggle solution picked successfully.",
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
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
