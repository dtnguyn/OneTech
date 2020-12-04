import { Review } from "../entities/Review";
import { ReviewRating } from "../entities/ReviewRating";
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

  @Mutation(() => Review, { nullable: true })
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

    await this.reviewRepo.save(newReview).catch(() => {
      return null;
    });
    return newReview;
  }

  @Mutation(() => Review, { nullable: true })
  async updateReview(
    @Arg("id") id: string,
    @Arg("input") input: UpdateReviewInput
  ) {
    await this.reviewRepo.update({ id }, input);
    return this.reviewRepo.findOne({ id });
  }

  @Mutation(() => Boolean)
  async deleteReview(@Arg("id") id: string) {
    await this.reviewRepo.delete({ id });
    return true;
  }

  @Query(() => [Review])
  reviews(@Arg("deviceId") deviceId: string) {
    return this.reviewRepo.find({ deviceId });
  }

  @Query(() => Review)
  singleReview(@Arg("id") id: string) {
    return this.reviewRepo.find({ id });
  }

  @Mutation(() => ReviewRating, { nullable: true })
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
    let newRating: ReviewRating | null = await this.ratingRepo.create({
      deviceId,
      overall,
      reviewId,
      display,
      battery,
      software,
      camera,
      processor,
    });

    await this.ratingRepo.save(newRating).catch((err) => {
      console.log(err);
      newRating = null;
    });
    return newRating;
  }

  @Mutation(() => Review, { nullable: true })
  async updateRating(
    @Arg("reviewId") reviewId: string,
    @Arg("input") input: UpdateRatingInput
  ) {
    await this.ratingRepo.update({ reviewId }, input);
    return this.ratingRepo.findOne({ reviewId });
  }

  @Query(() => [ReviewRating])
  ratings(@Arg("deviceId") deviceId: string) {
    return this.ratingRepo.find({ deviceId });
  }
}
