import { Review, ReviewResponse } from "../entities/Review";
import { ReviewRating, ReviewRatingResponse } from "../entities/ReviewRating";
import {
  Arg,
  Field,
  Float,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getRepository } from "typeorm";

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
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("authorId") authorId: string,
    @Arg("deviceId") deviceId: string
  ) {
    const newReview = await this.reviewRepo.create({
      title,
      content,
      authorId,
      deviceId,
    });

    await this.reviewRepo.save(newReview).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    return {
      status: true,
      message: "Create review successfully.",
      data: [newReview],
    };
  }

  @Mutation(() => ReviewResponse, { nullable: true })
  async updateReview(
    @Arg("id") id: string,
    @Arg("input") input: UpdateReviewInput
  ) {
    await this.reviewRepo.update({ id }, input).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    const review = this.reviewRepo.findOne({ id }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Update review successfully.",
      data: [review],
    };
  }

  @Mutation(() => ReviewResponse)
  async deleteReview(@Arg("id") id: string) {
    await this.reviewRepo.delete({ id }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    return {
      status: true,
      message: "Delete review successfully.",
    };
  }

  @Query(() => ReviewResponse)
  async reviews(@Arg("deviceId") deviceId: string) {
    const reviews = await this.reviewRepo.find({ deviceId }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Getting reviews successfully.",
      data: reviews,
    };
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
    @Arg("reviewId") reviewId: string,
    @Arg("deviceId") deviceId: string,
    @Arg("overall", () => Float, { nullable: true }) overall: number | null,
    @Arg("display", () => Float, { nullable: true }) display: number | null,
    @Arg("battery", () => Float, { nullable: true }) battery: number | null,
    @Arg("software", () => Float, { nullable: true }) software: number | null,
    @Arg("camera", () => Float, { nullable: true }) camera: number | null,
    @Arg("processor", () => Float, { nullable: true }) processor: number | null
  ) {
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

    await this.ratingRepo.save(newRating).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });
    return {
      status: true,
      message: "Create rating successfully.",
      data: [newRating],
    };
  }

  @Mutation(() => ReviewRatingResponse, { nullable: true })
  async updateRating(
    @Arg("reviewId") reviewId: string,
    @Arg("input") input: UpdateRatingInput
  ) {
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

  @Query(() => [ReviewRatingResponse])
  ratings(@Arg("deviceId") deviceId: string) {
    const ratings = this.ratingRepo.find({ deviceId }).catch((e) => {
      return {
        status: false,
        message: e.message,
      };
    });

    return {
      status: true,
      message: "Get ratings successfully.",
      data: ratings,
    };
  }
}
