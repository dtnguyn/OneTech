import { Storage } from "@google-cloud/storage";
import { rejects } from "assert";
import { GraphQLUpload } from "graphql-upload";
import path from "path";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import {
  ProblemImage,
  ProblemImageResponse,
  UploadImageResponse,
} from "../entities/ProblemImage";
import { ReviewImage, ReviewImageResponse } from "../entities/ReviewImage";
import { MyContext, Upload } from "../types";

const gc = new Storage({
  keyFilename: path.join(__dirname, `../../${process.env.GOOGLE_STORAGE}`),
  projectId: process.env.PROJECT_ID,
});

const bucket = gc.bucket(process.env.BUCKET_NAME!);

@Resolver()
export class ImageResolver {
  problemImageRepo = getRepository(ProblemImage);
  reviewImageRepo = getRepository(ReviewImage);

  // @Mutation(() => UploadImageResponse)
  // async uploadImage(
  //   @Ctx() { req }: MyContext,
  //   @Arg("image", () => String) image: string,
  //   @Arg("imageId", () => String) imageId: string
  // ) {
  //   if (!(req.session as any).userId) {
  //     return {
  //       status: false,
  //       message: "You haven't logged in. Please Log in and try again.",
  //     };
  //   }

  //   const url: string = await new Promise((resolve, reject) => {
  //     var bufferStream = new stream.PassThrough();
  //     bufferStream.end(Buffer.from(image, "base64"));
  //     const file = bucket.file(imageId);
  //     bufferStream
  //       .pipe(
  //         file.createWriteStream({
  //           metadata: {
  //             contentType: "image/jpeg",
  //             metadata: {
  //               custom: "metadata",
  //             },
  //           },
  //           public: true,
  //           validation: "md5",
  //         })
  //       )
  //       .on("error", function (err) {
  //         reject(err.message);
  //       })
  //       .on("finish", function () {
  //         resolve(`https://storage.googleapis.com/${bucket.name}/${imageId}`);
  //       });
  //   });

  //   if (url) {
  //     return {
  //       status: true,
  //       message: "Upload image successfully",
  //       data: [url],
  //     };
  //   } else
  //     return {
  //       status: false,
  //       message: "Fail to upload image",
  //     };
  // }

  @Mutation(() => UploadImageResponse)
  async uploadImage(
    @Ctx() { req }: MyContext,
    @Arg("imageId", () => String) imageId: string,
    @Arg("image", () => GraphQLUpload) image: Upload
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }
    try {
      const url: string = await new Promise((resolve, reject) => {
        const file = bucket.file(imageId);
        image
          .createReadStream()
          .pipe(
            file.createWriteStream({
              resumable: false,
              gzip: true,
            })
          )
          .on("error", function (err) {
            reject(err.message);
            console.log(err);
          })
          .on("finish", function () {
            resolve(`https://storage.googleapis.com/${bucket.name}/${imageId}`);
          });
      });

      if (url) {
        return {
          status: true,
          message: "Upload image successfully",
          data: [url],
        };
      } else
        return {
          status: false,
          message: "Fail to upload image",
        };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => UploadImageResponse)
  async deleteImages(
    @Ctx() { req }: MyContext,
    @Arg("imageIds", () => [String]) imageIds: string[]
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }

    try {
      let counter = 0;
      await new Promise((resolve) => {
        for (const id of imageIds) {
          const file = bucket.file(id);
          file.delete((err) => {
            if (err) {
              rejects(err as any);
            } else {
              counter += 1;
              if (counter === imageIds.length) {
                resolve(true);
              }
            }
          });
        }
      });
      return {
        status: true,
        message: "Delete images successfully.",
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Query(() => ProblemImageResponse)
  async problemImages() {
    const images = await this.problemImageRepo.find();

    return {
      status: true,
      message: "Getting problem images successfully!",
      data: images,
    };
  }

  @Query(() => ReviewImageResponse)
  async reviewImages() {
    const images = await this.reviewImageRepo.find();

    return {
      status: true,
      message: "Getting review images successfully!",
      data: images,
    };
  }
}
