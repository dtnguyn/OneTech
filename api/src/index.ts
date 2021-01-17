require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import redis from "redis";
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
import * as socketio from "socket.io";

(async () => {
  await createConnection();

  const app = express();
  let http = require("http").Server(app);
  // set up socket.io and bind it to our
  // http server.
  let io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

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

  io.on("connection", (socket) => {
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
      return { req, res, io };
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  http.listen(4000, () => {
    console.log("One-tech server running on port 4000");
  });
})();
