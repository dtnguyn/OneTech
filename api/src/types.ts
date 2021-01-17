import { Request, Response } from "express";

export type MyContext = {
  req: Request;
  res: Response;
  io: SocketIO.Server;
};
