require("dotenv").config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { buildSchema, ID } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import { UserResolver } from "./resolvers/UserResolver";

import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__ } from "./constants";
import { MyContext } from "./types";
import auth from "./auth";
import { DeviceResolver } from "./resolvers/DeviceResolver";
import { ProblemResolver } from "./resolvers/ProblemResolver";
import { SolutionResolver } from "./resolvers/SolutionResolver";
import { ReviewResolver } from "./resolvers/ReviewResolver";
import cors from "cors";
import { ImageResolver } from "./resolvers/ImageResolver";
import { ReportResolver } from "./resolvers/ReportResolver";
import { NotificationResponse } from "./entities/Notification";
import { NotificationResolver } from "./resolvers/NotificationResolver";

(async () => {
  await createConnection();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  redisClient.on("connect", function () {
    console.log("Connected to Redis");
  });

  redisClient.on("error", function (err) {
    console.log("Redis error: " + err);
  });

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use("/auth", auth);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloWorldResolver,
        UserResolver,
        DeviceResolver,
        ProblemResolver,
        SolutionResolver,
        ReviewResolver,
        ImageResolver,
        ReportResolver,
        NotificationResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => {
      return { req, res };
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("One-tech server running on port 4000");
  });
})();
