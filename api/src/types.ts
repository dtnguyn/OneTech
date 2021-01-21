import { Request, Response } from "express";
import { RedisClient } from "redis";

export type MyContext = {
  req: Request;
  res: Response;
  io: SocketIO.Server;
  redis: RedisClient;
};
