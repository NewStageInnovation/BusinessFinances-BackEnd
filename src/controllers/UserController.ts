import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import { IUser, UserModel } from "../modelsNOSQL/UserModel";
import { Model, HydratedDocument } from "mongoose";

class UserController extends AbstractController {
  protected validateBody(type: any) {
    throw new Error("Method not implemented.");
  }

  private readonly _model: Model<IUser> = UserModel;

  // Singleton
  private static instance: UserController;
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new UserController("user");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.post("/getUser", this.getUser.bind(this));
  }

  private async getUser(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user: HydratedDocument<IUser> | null = await UserModel.findOne({
        email: email,
      });

      if (!user) {
        throw "Failed to find user";
      }
      res.status(200).send({ user });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

}

export default UserController;
