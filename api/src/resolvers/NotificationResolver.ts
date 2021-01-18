import { Notification, NotificationResponse } from "../entities/Notification";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class NotificationResolver {
  notificationRepo = getConnection().getRepository(Notification);

  @Query(() => NotificationResponse)
  async notifications(
    @Ctx() { req }: MyContext,
    @Arg("unseen", { nullable: true }) unseen: boolean
  ) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }
    const userId = (req.session as any).userId;
    let notifications;

    if (unseen === undefined || unseen === null) {
      notifications = await this.notificationRepo
        .createQueryBuilder("notification")
        .where("notification.userId = :userId", { userId })
        .orderBy("notification.createdAt", "DESC")
        .getMany();
    } else {
      notifications = await this.notificationRepo
        .createQueryBuilder("notification")
        .where("notification.userId = :userId", { userId })
        .andWhere("notification.seen = :seen", { seen: !unseen })
        .orderBy("notification.createdAt", "DESC")
        .getMany();
    }

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

  @Mutation(() => NotificationResponse)
  async seenNotifications(@Ctx() { req, io }: MyContext) {
    if (!(req.session as any).userId) {
      return {
        status: false,
        message: "You haven't logged in. Please Log in and try again.",
      };
    }

    try {
      const userId = (req.session as any).userId;

      await this.notificationRepo.update(
        { userId: userId, seen: false },
        { seen: true }
      );

      io.emit(`seenNotifications:${userId}`);

      return {
        status: true,
        message: "Seen notifications successfully.",
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }
}
