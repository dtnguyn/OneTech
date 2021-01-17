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
import { Notification } from "../entities/Notification";
import { User } from "../entities/User";

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
    @Ctx() { req, io }: MyContext,
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

      const problem = await manager
        .createQueryBuilder(DeviceProblem, "problem")
        .leftJoinAndSelect("problem.author", "author")
        .where("problem.id = :problemId", { problemId })
        .getOne();

      const problemAuthor = problem?.author;

      const solutionAuthor = await manager.findOne(User, { id: authorId });

      if (problemAuthor && solutionAuthor) {
        if (problemAuthor.id !== solutionAuthor.id) {
          await manager.insert(Notification, {
            title: `Someone answers your question.`,
            content: `${solutionAuthor.username} posted a new solution. Check it out!`,
            userId: problemAuthor.id,
            link: `${process.env.CLIENT_URL}/problem/${problemId}`,
            category: "solution",
          });
          io.emit(`notification:${problemAuthor.id}`, true);
        }
      } else {
        throw new Error("Not found problem.");
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        status: true,
        message: "Create solution successfully.",
        data: [solution],
      };
    } catch (error) {
      queryRunner.rollbackTransaction();
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
        .leftJoinAndSelect("solution.problem", "problem")
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
    @Ctx() { req, io }: MyContext,
    @Arg("userId") userId: string,
    @Arg("solutionId") solutionId: string
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
      const star = await manager.findOne(SolutionStar, { userId, solutionId });

      if (star) {
        await manager.delete(SolutionStar, { userId, solutionId });
      } else {
        await manager.insert(SolutionStar, { userId, solutionId });

        const solution = await manager
          .createQueryBuilder(Solution, "solution")
          .leftJoinAndSelect("solution.author", "author")
          .where("solution.id = :solutionId", { solutionId })
          .getOne();

        const solutionAuthor = solution?.author;

        const starAuthor = await manager.findOne(User, { id: userId });

        if (solutionAuthor && starAuthor) {
          if (solutionAuthor.id !== starAuthor.id) {
            await manager.insert(Notification, {
              title: `Someone stars your solution post.`,
              content: `${starAuthor.username} give you a star to your solution!`,
              userId: solutionAuthor.id,
              link: `${process.env.CLIENT_URL}/problem/${solution!.problemId}`,
              category: "star",
            });
            io.emit(`notification:${solutionAuthor.id}`, true);
          }
        } else {
          throw new Error("Not found problem.");
        }
      }
    } catch (error) {
      queryRunner.rollbackTransaction();
      return {
        status: false,
        message: error.message,
      };
    }

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return {
      status: true,
      message: "Toggle star solution successfully.",
    };
  }

  @Mutation(() => SolutionResponse)
  async toggleSolutionPicked(
    @Ctx() { req, io }: MyContext,
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
      const problem = await await manager
        .createQueryBuilder(DeviceProblem, "problem")
        .leftJoinAndSelect("problem.author", "author")
        .where("problem.id = :problemId", { problemId })
        .getOne();
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

        const solution = await manager
          .createQueryBuilder(Solution, "solution")
          .leftJoinAndSelect("solution.author", "author")
          .where("solution.id = :solutionId", { solutionId })
          .getOne();

        const solutionAuthor = solution?.author;

        const problemAuthor = problem?.author;

        if (solutionAuthor && problemAuthor) {
          if (solutionAuthor.id !== problemAuthor.id) {
            await manager.insert(Notification, {
              title: `Your solution has been picked!`,
              content: `${problemAuthor.username} has picked your solution!`,
              userId: solutionAuthor.id,
              link: `${process.env.CLIENT_URL}/problem/${problemId}`,
              category: "pick",
            });
            io.emit(`notification:${solutionAuthor.id}`, true);
          }
        } else {
          throw new Error("Not found problem.");
        }
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        status: true,
        message: "Toggle solution picked successfully.",
      };
    } catch (error) {
      queryRunner.rollbackTransaction();
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
