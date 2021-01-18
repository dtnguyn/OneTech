import { ProblemImage } from "../entities/ProblemImage";
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

import { DeviceProblem, ProblemResponse } from "../entities/DeviceProblem";
import {
  DeviceProblemStar,
  ProblemStarResponse,
} from "../entities/DeviceProblemStar";
import { MyContext } from "../types";
import { Notification } from "../entities/Notification";
import { Device } from "../entities/Device";
import { User } from "../entities/User";

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
  imageRepo = getRepository(ProblemImage);
  notiRepo = getRepository(Notification);

  @Mutation(() => ProblemResponse, { nullable: true })
  async createProblem(
    @Ctx() { req, io }: MyContext,
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("deviceId") deviceId: string,
    @Arg("images", () => [String]) images: string[]
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }
    const authorId = (req.session as any).userId;
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const manager = queryRunner.manager;

      const newProblem = await manager.create(DeviceProblem, {
        title,
        content,
        authorId,
        deviceId,
      });

      await manager.insert(DeviceProblem, newProblem);

      console.log(
        "Fix bugs",
        await manager.findOne(DeviceProblem, { id: newProblem.id })
      );

      if (images.length != 0) {
        await new Promise((resolve, reject) => {
          let counter = 0;
          for (const image of images) {
            console.log("Fix bugs image", image, newProblem.id);
            manager
              .insert(ProblemImage, {
                path: image,
                problemId: newProblem.id,
              })
              .then(() => {
                counter += 1;
                if (counter === images.length) {
                  resolve(true);
                }
              })
              .catch((e) => {
                console.log(e.message);
                reject(e);
              });
          }
        });
      }

      const device = await manager
        .createQueryBuilder(Device, "device")
        .leftJoinAndSelect("device.followers", "follower")
        .where("device.id = :deviceId", { deviceId })
        .getOne();

      const followers = device?.followers;

      if (followers && followers.length) {
        await new Promise((resolve, reject) => {
          let counter = 0;
          for (const follower of followers) {
            if (follower.userId === authorId) {
              counter++;
              if (counter === followers.length) resolve(true);
              continue;
            }
            manager
              .insert(Notification, {
                title: `${device?.name} has a new problem`,
                content:
                  "There's a new problem posted for iPhone12, Check it out!",
                userId: follower.userId,
                link: `${process.env.CLIENT_URL}/problem/${newProblem.id}`,
                category: "problem",
              })
              .then(() => {
                io.emit(`notification:${follower.userId}`, true);
                counter++;
                if (counter === followers.length) resolve(true);
              })
              .catch((error) => {
                reject(error);
              });
          }
        });
      } else if (!followers) {
        throw new Error("Couldn't find device.");
      }
      console.log("Weird");
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        status: true,
        message: "Create problem successfully.",
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => ProblemResponse)
  async deleteProblem(
    @Ctx() { req }: MyContext,
    @Arg("id") id: string,
    @Arg("adminId", { nullable: true }) adminId: string
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }
    const userId = (req.session as any).userId;

    try {
      const problem = await this.problemRepo.findOne({ id });

      if (problem) {
        if (
          problem.authorId === userId ||
          (adminId && adminId === process.env.ADMIN_ID)
        ) {
          await this.problemRepo.delete({ id });

          return {
            status: true,
            message: "Delete problem successfully.",
          };
        } else {
          throw new Error("You are not the author of this post");
        }
      } else {
        throw new Error("The problem does not exist");
      }
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => ProblemResponse)
  async updateProblem(
    @Ctx() { req }: MyContext,
    @Arg("id") id: string,
    @Arg("input") input: UpdateProblemInput,
    @Arg("images", () => [String]) images: string[]
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }

    const userId = (req.session as any).userId;

    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const manager = queryRunner.manager;

      const problem = await manager.findOne(DeviceProblem, { id });
      if (!problem) throw new Error("The problem doesn't not exist");
      if (problem?.authorId !== userId)
        throw new Error("You are not the author of this post.");

      await manager.update(DeviceProblem, { id }, input);

      if (images && images.length != 0) {
        await new Promise((resolve, reject) => {
          let counter = 0;
          for (const image of images) {
            this.imageRepo
              .insert({
                path: image,
                problemId: id,
              })
              .then(() => {
                counter += 1;
                if (counter === images.length) {
                  resolve(true);
                }
              })
              .catch((e) => {
                console.log(e.message);
                reject(e);
              });
          }
        });
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        status: true,
        message: "Update problem successfully.",
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        status: false,
        message: "Fail to update problem.",
      };
    }
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
        .leftJoinAndSelect("problem.device", "device")
        .leftJoinAndSelect("problem.stars", "stars")
        .leftJoinAndSelect("problem.images", "images")
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

      builder.orderBy("problem.createdAt", "DESC");
      const problems = await builder.getMany();

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
        .leftJoinAndSelect("problem.author", "author")
        .leftJoinAndSelect("solutions.stars", "solutionStars")
        .orderBy("solutions.createdAt", "DESC")
        .leftJoinAndSelect("solutions.author", "solutionAuthor")
        .leftJoinAndSelect("solutions.images", "solutionImages")
        .leftJoinAndSelect("problem.images", "images")
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
    @Ctx() { req, io }: MyContext,
    @Arg("userId") userId: string,
    @Arg("problemId") problemId: string
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
      const star = await manager.findOne(DeviceProblemStar, {
        userId,
        problemId,
      });

      if (star) {
        await manager.delete(DeviceProblemStar, { userId, problemId });
      } else {
        await manager.insert(DeviceProblemStar, {
          userId,
          problemId,
        });

        const problem = await manager
          .createQueryBuilder(DeviceProblem, "problem")
          .leftJoinAndSelect("problem.author", "author")
          .where("problem.id = :problemId", { problemId })
          .getOne();

        const problemAuthor = problem?.author;

        const starAuthor = await manager.findOne(User, { id: userId });

        if (problemAuthor && starAuthor) {
          if (problemAuthor.id !== starAuthor.id) {
            await manager.insert(Notification, {
              title: `Someone stars your problem post.`,
              content: `${starAuthor.username} give you a star to your problem!`,
              userId: problemAuthor.id,
              link: `${process.env.CLIENT_URL}/problem/${problemId}`,
              category: "star",
            });
            io.emit(`notification:${problemAuthor.id}`, true);
          }
        } else {
          throw new Error("Not found problem.");
        }
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        status: true,
        message: "Toggle star problem successfully.",
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        status: false,
        message: error.message,
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
