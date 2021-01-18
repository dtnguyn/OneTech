import { Review, ReviewResponse } from "../entities/Review";
import { ReviewRating, ReviewRatingResponse } from "../entities/ReviewRating";
import {
  Arg,
  Ctx,
  Field,
  Float,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { ReviewImage } from "../entities/ReviewImage";
import { MyContext } from "../types";

@InputType()
class UpdateReviewInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content?: string;
}

@InputType()
class UpdateRatingInput {
  @Field(() => Float, { nullable: true })
  overall?: number;

  @Field(() => Float, { nullable: true })
  display?: number;

  @Field(() => Float, { nullable: true })
  camera?: number;

  @Field(() => Float, { nullable: true })
  software?: number;

  @Field(() => Float, { nullable: true })
  processor?: number;

  @Field(() => Float, { nullable: true })
  battery?: number;
}

@Resolver()
export class ReviewResolver {
  reviewRepo = getRepository(Review);
  ratingRepo = getRepository(ReviewRating);

  @Mutation(() => ReviewResponse, { nullable: true })
  async createReview(
    @Ctx() { req }: MyContext,
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("deviceId") deviceId: string,
    @Arg("overall", () => Float, { nullable: true }) overall: number | null,
    @Arg("display", () => Float, { nullable: true }) display: number | null,
    @Arg("battery", () => Float, { nullable: true }) battery: number | null,
    @Arg("software", () => Float, { nullable: true }) software: number | null,
    @Arg("camera", () => Float, { nullable: true }) camera: number | null,
    @Arg("processor", () => Float, { nullable: true }) processor: number | null,
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
      const review = await manager.create(Review, {
        title,
        content,
        authorId,
        deviceId,
      });
      await manager.insert(Review, review);
      await manager.insert(ReviewRating, {
        deviceId,
        reviewId: review.id,
        overall,
        display,
        battery,
        software,
        camera,
        processor,
      });

      if (images.length != 0) {
        await new Promise((resolve, reject) => {
          let counter = 0;
          for (const image of images) {
            manager
              .insert(ReviewImage, {
                path: image,
                reviewId: review.id,
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

      const newReview = await manager
        .createQueryBuilder(Review, "review")
        .leftJoinAndSelect("review.rating", "rating")
        .leftJoinAndSelect("review.author", "author")
        .where("review.id = :id", { id: review.id })
        .getOne();

      await queryRunner.commitTransaction();

      return {
        status: true,
        message: "Create review successfully.",
        data: [newReview],
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        status: false,
        message: error.message,
      };
    } finally {
      await queryRunner.release();
    }
  }

  @Mutation(() => ReviewResponse, { nullable: true })
  async updateReview(
    @Ctx() { req }: MyContext,
    @Arg("id") id: string,
    @Arg("reviewInput") reviewInput: UpdateReviewInput,
    @Arg("ratingInput") ratingInput: UpdateRatingInput,
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

      const review = await manager.findOne(Review, { id });
      if (!review) throw new Error("The review does not exist.");
      if (review.authorId !== userId)
        throw new Error("You are not the author of this post.");

      await manager.update(Review, { id }, reviewInput);
      await manager.update(ReviewRating, { reviewId: id }, ratingInput);

      if (images.length != 0) {
        await new Promise((resolve, reject) => {
          let counter = 0;
          for (const image of images) {
            manager
              .insert(ReviewImage, {
                path: image,
                reviewId: id,
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

      const updatedReview = await manager
        .createQueryBuilder(Review, "review")
        .leftJoinAndSelect("review.rating", "rating")
        .leftJoinAndSelect("review.author", "author")
        .where("review.id = :id", { id })
        .getOne();

      queryRunner.commitTransaction();

      return {
        status: true,
        message: "Update review successfully.",
        data: [updatedReview],
      };
    } catch (error) {
      queryRunner.rollbackTransaction();
      return {
        status: false,
        message: error.message,
      };
    } finally {
      queryRunner.release();
    }
  }

  @Mutation(() => ReviewResponse)
  async deleteReview(
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
      const review = await this.reviewRepo.findOne({ id });
      if (!review) throw new Error("The review does not exist");
      if (review.authorId !== userId && adminId !== process.env.ADMIN_ID)
        throw new Error("You are not the author of this");
      await this.reviewRepo.delete({ id });
      return {
        status: true,
        message: "Delete review successfully.",
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Query(() => ReviewResponse)
  async reviews(
    @Arg("deviceId", { nullable: true }) deviceId: string,
    @Arg("authorId", { nullable: true }) authorId: string,
    @Arg("title", { nullable: true }) title: string,
    @Arg("content", { nullable: true }) content: string
  ) {
    try {
      const builder = await this.reviewRepo
        .createQueryBuilder("review")
        .leftJoinAndSelect("review.author", "author")
        .leftJoinAndSelect("review.rating", "rating")
        .leftJoinAndSelect("review.images", "images");

      if (authorId) builder.where("review.authorId = :authorId", { authorId });
      if (deviceId) builder.where("review.deviceId = :deviceId", { deviceId });

      if (title && content) {
        builder
          .andWhere("LOWER(review.title) LIKE LOWER(:title)", {
            title: "%" + title + "%",
          })
          .orWhere("LOWER(review.content) LIKE LOWER(:content)", {
            content: "%" + content + "%",
          });
      } else if (title)
        builder.andWhere("LOWER(review.title) LIKE LOWER(:title)", {
          title: "%" + title + "%",
        });
      else if (content)
        builder.andWhere("LOWER(review.content) LIKE LOWER(:content)", {
          content: "%" + content + "%",
        });

      const reviews = await builder
        .orderBy("review.createdAt", "DESC")
        .getMany();

      return {
        status: true,
        message: "Getting reviews successfully.",
        data: reviews,
      };
    } catch (e) {
      return {
        status: false,
        message: e.message,
      };
    }
  }

  @Query(() => ReviewResponse)
  async singleReview(@Arg("id") id: string) {
    const review = await this.reviewRepo.findOne({ id }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Getting a review successfully.",
      data: [review],
    };
  }

  @Mutation(() => ReviewRatingResponse, { nullable: true })
  async createRating(
    @Ctx() { req }: MyContext,
    @Arg("reviewId") reviewId: string,
    @Arg("deviceId") deviceId: string,
    @Arg("overall", () => Float, { nullable: true }) overall: number | null,
    @Arg("display", () => Float, { nullable: true }) display: number | null,
    @Arg("battery", () => Float, { nullable: true }) battery: number | null,
    @Arg("software", () => Float, { nullable: true }) software: number | null,
    @Arg("camera", () => Float, { nullable: true }) camera: number | null,
    @Arg("processor", () => Float, { nullable: true }) processor: number | null
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }
    try {
      let newRating = await this.ratingRepo.create({
        deviceId,
        overall,
        reviewId,
        display,
        battery,
        software,
        camera,
        processor,
      });

      await this.ratingRepo.insert(newRating);

      return {
        status: true,
        message: "Create rating successfully.",
        data: [newRating],
      };
    } catch (e) {
      console.log("error");
      return {
        status: false,
        message: e.message,
      };
    }
  }

  @Mutation(() => ReviewRatingResponse, { nullable: true })
  async updateRating(
    @Ctx() { req }: MyContext,
    @Arg("reviewId") reviewId: string,
    @Arg("input") input: UpdateRatingInput
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }
    await this.ratingRepo.update({ reviewId }, input).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    const rating = await this.ratingRepo.findOne({ reviewId }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Update rating successfully.",
      data: [rating],
    };
  }

  @Query(() => ReviewRatingResponse)
  async ratings(@Arg("deviceId") deviceId: string) {
    // const ratings = await this.ratingRepo.find({ deviceId }).catch((e) => {
    //   return {
    //     status: false,
    //     message: e.message,
    //   };
    // });
    const rating = await this.ratingRepo
      .createQueryBuilder("rating")
      .select("AVG(rating.display)", "display")
      .addSelect("AVG(rating.overall)", "overall")
      .addSelect("AVG(rating.display)", "display")
      .addSelect("AVG(rating.processor)", "processor")
      .addSelect("AVG(rating.battery)", "battery")
      .addSelect("AVG(rating.software)", "software")
      .addSelect("AVG(rating.camera)", "camera")
      .where("rating.deviceId = :deviceId", { deviceId })
      .getRawOne();

    return {
      status: true,
      message: "Get ratings successfully.",
      data: [rating],
    };
  }
}
