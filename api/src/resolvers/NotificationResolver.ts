import { Notification, NotificationResponse } from "../entities/Notification";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class NotificationResolver {
  notificationRepo = getConnection().getRepository(Notification);

  @Query(() => NotificationResponse)
  async notifications(@Ctx() { req }: MyContext) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }

    const notifications = await this.notificationRepo.find({
      userId: (req.session as any).userId as string,
    });

    console.log(notifications);
    return {
      status: false,
      message: "Get notifications successfully",
      data: notifications,
    };
  }

  @Mutation(() => NotificationResponse)
  async deleteNotification(@Ctx() { req }: MyContext, @Arg("id") id: string) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }

    try {
      const userId = (req.session as any).userId;
      const notification = await this.notificationRepo.findOne({ id });

      if (userId === notification?.userId) {
        this.notificationRepo.delete({ id });
      } else throw new Error("You are not the owner of the notification.`");

      return {
        status: true,
        message: "Delete notification successfully.",
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }
}
