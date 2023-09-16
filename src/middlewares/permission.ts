import { Response, Request, NextFunction } from "express";
// Models
import { IUser, UserModel } from "../modelsNOSQL/UserModel";
import { HydratedDocument } from "mongoose";

export default class PermissionMiddleware {
  // Singleton
  private static instance: PermissionMiddleware;
  public static getInstance(): PermissionMiddleware {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new PermissionMiddleware();
    return this.instance;
  }
}
