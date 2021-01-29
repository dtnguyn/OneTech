import { config } from "dotenv";
config();
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import auth from "./auth";
import { __prod__ } from "./constants";
import { DeviceResolver } from "./resolvers/DeviceResolver";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import { ImageResolver } from "./resolvers/ImageResolver";
import { NotificationResolver } from "./resolvers/NotificationResolver";
import { ProblemResolver } from "./resolvers/ProblemResolver";
import { ReportResolver } from "./resolvers/ReportResolver";
import { ReviewResolver } from "./resolvers/ReviewResolver";
import { SolutionResolver } from "./resolvers/SolutionResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { MyContext } from "./types";
import path from "path";
import { Device } from "./entities/Device";
import { DeviceFollower } from "./entities/DeviceFollower";
import { DeviceProblem } from "./entities/DeviceProblem";
import { DeviceProblemStar } from "./entities/DeviceProblemStar";
import { DeviceSpec } from "./entities/DeviceSpec";
import { Notification } from "./entities/Notification";
import { ProblemImage } from "./entities/ProblemImage";
import { Report } from "./entities/Report";
import { Review } from "./entities/Review";
import { ReviewImage } from "./entities/ReviewImage";
import { ReviewRating } from "./entities/ReviewRating";
import { Solution } from "./entities/Solution";
import { SolutionImage } from "./entities/SolutionImage";
import { SolutionStar } from "./entities/SolutionStar";
import { User } from "./entities/User";
import { UserSetting } from "./entities/UserSetting";
import Redis from "ioredis";

(async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [
      Device,
      DeviceFollower,
      DeviceProblem,
      DeviceProblemStar,
      DeviceSpec,
      Notification,
      ProblemImage,
      Report,
      Review,
      ReviewImage,
      ReviewRating,
      Solution,
      SolutionImage,
      SolutionStar,
      User,
      UserSetting,
    ],
  });

  await conn.runMigrations();
  const app = express();

  let http = require("http").Server(app);
  // set up socket.io and bind it to our
  // http server.
  let io = require("socket.io")(http, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  const RedisStore = connectRedis(session);
  const redisClient = new Redis(process.env.REDIS_URL);

  redisClient.on("connect", function () {
    console.log("Connected to Redis");
  });

  redisClient.on("error", function (err) {
    console.log("Redis error: " + err);
  });

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
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
        domain: __prod__ ? ".onetech.guru" : undefined,
      },
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use("/auth", auth);

  io.on("connection", () => {
    console.log("New user connected");
  });

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
      return { req, res, io, redis: redisClient };
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  http.listen(parseInt(process.env.PORT!), () => {
    console.log("One-tech server running");
  });
})();
