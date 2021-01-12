import { Report, ReportResponse } from "../entities/Report";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { MyContext } from "src/types";

@Resolver()
export class ReportResolver {
  reportRepo = getRepository(Report);

  @Mutation(() => ReportResponse)
  async createReport(
    @Ctx() { req }: MyContext,
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("authorId") authorId: string,
    @Arg("problemId", { nullable: true }) problemId: string,
    @Arg("reviewId", { nullable: true }) reviewId: string,
    @Arg("solutionId", { nullable: true }) solutionId: string
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }

    const newReport = await this.reportRepo.create({
      title,
      content,
      authorId,
      problemId,
      reviewId,
      solutionId,
    });

    await this.reportRepo.insert(newReport);

    return {
      status: true,
      message: "Successfully create report.",
    };
  }

  @Query(() => ReportResponse)
  async reports() {
    const reports = await this.reportRepo.find();

    console.log(reports);
    return {
      status: true,
      message: "Get report successfully",
      data: reports,
    };
  }
}
