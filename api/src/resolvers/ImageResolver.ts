import {
  ProblemImage,
  ProblemImageResponse,
  UploadImageResponse,
} from "../entities/ProblemImage";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Storage } from "@google-cloud/storage";
import path from "path";
import stream from "stream";
import { getRepository } from "typeorm";
import { ReviewImage, ReviewImageResponse } from "../entities/ReviewImage";
import { rejects } from "assert";

const gc = new Storage({
  keyFilename: path.join(__dirname, `../../${process.env.GOOGLE_STORAGE}`),
  projectId: process.env.PROJECT_ID,
});

const bucket = gc.bucket(process.env.BUCKET_NAME!);

@Resolver()
export class ImageResolver {
  problemImageRepo = getRepository(ProblemImage);
  reviewImageRepo = getRepository(ReviewImage);

  @Mutation(() => UploadImageResponse)
  async uploadImage(
    @Arg("image", () => String) image: string,
    @Arg("imageId", () => String) imageId: string
  ) {
    console.log("upload images", imageId);
    const url: string = await new Promise((resolve, reject) => {
      var bufferStream = new stream.PassThrough();
      bufferStream.end(Buffer.from(image, "base64"));
      const file = bucket.file(imageId);
      bufferStream
        .pipe(
          file.createWriteStream({
            metadata: {
              contentType: "image/jpeg",
              metadata: {
                custom: "metadata",
              },
            },
            public: true,
            validation: "md5",
          })
        )
        .on("error", function (err) {
          console.log(err.message);
          reject(err.message);
        })
        .on("finish", function () {
          console.log(
            `https://storage.googleapis.com/${bucket.name}/${imageId}`
          );
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
  }

  @Mutation(() => UploadImageResponse)
  async deleteImages(@Arg("imageIds", () => [String]) imageIds: string[]) {
    console.log("delete images", imageIds);
    try {
      let counter = 0;
      await new Promise((resolve) => {
        for (const id of imageIds) {
          const file = bucket.file(id);
          file.delete((err, res) => {
            console.log(err?.message, res?.statusCode);
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
