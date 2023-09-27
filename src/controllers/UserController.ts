import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import { IGasto, GastoModel } from "../modelsNOSQL/GastoModel";
import { IIngreso, IngresoModel } from "../modelsNOSQL/IngresoModel";
import { IDeuda, DeudaModel} from "../modelsNOSQL/DeudaModel";
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
    this.router.get("/getGastos/:correo", this.getGastos.bind(this));
    this.router.get("/getIngresos/:correo", this.getIngresos.bind(this));
    this.router.get("/getDeudas/:correo", this.getDeudas.bind(this));
    this.router.post("/addGasto/:correo", this.addGasto.bind(this));
    this.router.post("/addIngreso/:correo", this.addIngreso.bind(this));
    this.router.post("/addDeuda/:correo", this.addDeuda.bind(this));
    this.router.delete("/deleteGasto/:correo/:id", this.deleteGasto.bind(this));
    this.router.delete("/deleteIngreso/:correo/:id", this.deleteIngreso.bind(this));
    this.router.delete("/deleteDeuda/:correo/:id", this.deleteDeuda.bind(this));
    this.router.put("/updateGasto/:correo/:id", this.updateGasto.bind(this));
    this.router.put("/updateIngreso/:correo/:id", this.updateIngreso.bind(this));
    this.router.put("/updateDeuda/:correo/:id", this.updateDeuda.bind(this));
  }

  private async getUser(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user: HydratedDocument<IUser> | null = await this._model.findOne({
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

  private async getGastos(req: Request, res: Response) {
    try {
      const { correo } = req.params;

      const user: HydratedDocument<IUser> | null = await this._model.findOne({
        correo: correo,
      });

      if (!user) {
        throw "Failed to find user";
      }
      res.status(200).send({ gastos: user.gastos });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async getIngresos(req: Request, res: Response) {
    try {
      const { correo } = req.params;

      const user: HydratedDocument<IUser> | null = await this._model.findOne({
        correo: correo,
      });

      if (!user) {
        throw "Failed to find user";
      }
      res.status(200).send({ ingresos: user.ingresos });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async getDeudas(req: Request, res: Response) {
    try {
      const { correo } = req.params;

      const user: HydratedDocument<IUser> | null = await this._model.findOne({
        correo: correo,
      });

      if (!user) {
        throw "Failed to find user";
      }
      res.status(200).send({ deudas: user.deudas });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async addGasto(req: Request, res: Response) {
    try {
      const { correo } = req.params;
      const { gasto } = req.body;

      const user: HydratedDocument<IUser> | null = await this._model.findOne({
        correo: correo,
      });

      if (!user) {
        throw "Failed to find user";
      }

      const newGasto : HydratedDocument<IGasto> = new GastoModel({
        ...gasto
      });

      user.gastos.push(newGasto);
      await user.save();

      res.status(200).send({ gastos: user.gastos });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async addIngreso(req: Request, res: Response) {
    try {
      const { correo } = req.params;
      const { ingreso } = req.body;

      const user: HydratedDocument<IUser> | null = await this._model.findOne({
        email: correo,
      });

      if (!user) {
        throw "Failed to find user";
      }

      const newIngreso : HydratedDocument<IIngreso> = new IngresoModel({
        ...ingreso
      });

      user.ingresos.push(newIngreso);
      await user.save();

      res.status(200).send({ ingresos: user.ingresos });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async addDeuda(req: Request, res: Response) {
    try {
      const { correo } = req.params;
      const { deuda } = req.body;

      const user: HydratedDocument<IUser> | null = await this._model.findOne({
        email: correo,
      });

      if (!user) {
        throw "Failed to find user";
      }

      const newDeuda : HydratedDocument<IDeuda> = new DeudaModel({
        ...deuda
      });

      user.deudas.push(newDeuda);
      await user.save();

      res.status(200).send({ deudas: user.deudas });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async deleteGasto(req: Request, res: Response) {
    try {
      const { correo, id } = req.params;

      const user: HydratedDocument<IUser> | null = await this._model.findOneAndUpdate(
        { email: correo },
        { $pull: { gastos: { _id: id } } },
        { new: true }
      );
      if (!user) {
        throw "Failed to find user";
      }
      res.status(200).send({ gastos: user.gastos });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async deleteIngreso(req: Request, res: Response) {
    try {
      const { correo, id } = req.params;

      const user: HydratedDocument<IUser> | null = await this._model.findOneAndUpdate(
        { email: correo },
        { $pull: { ingresos: { _id: id } } },
        { new: true }
      );
      if (!user) {
        throw "Failed to find user";
      }
      res.status(200).send({ ingresos: user.ingresos });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async deleteDeuda(req: Request, res: Response) {
    try {
      const { correo, id } = req.params;

      const user: HydratedDocument<IUser> | null = await this._model.findOneAndUpdate(
        { email: correo },
        { $pull: { deudas: { _id: id } } },
        { new: true }
      );
      if (!user) {
        throw "Failed to find user";
      }
      res.status(200).send({ deudas: user.deudas });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async updateGasto(req: Request, res: Response) {
    const { correo, id } = req.params;
    const { gasto } = req.body;

    try {
      const user: HydratedDocument<IUser> | null = await this._model.findOneAndUpdate(
        { email: correo, "gastos._id": id },
        {
          $set: {
            "gastos.$.nombre": gasto.nombre,
            "gastos.$.monto": gasto.monto,
            "gastos.$.fecha": gasto.fecha,
            "gastos.$.categoria": gasto.categoria,
          },
        },
        { new: true }
      );
      if (!user) {
        throw "Failed to find user";
      }
      res.status(200).send({ gastos: user.gastos });
    }
    catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async updateIngreso(req: Request, res: Response) {
    const { correo, id } = req.params;
    const { ingreso } = req.body;

    try {
      const user: HydratedDocument<IUser> | null = await this._model.findOneAndUpdate(
        { email: correo, "ingresos._id": id },
        {
          $set: {
            "ingresos.$.nombre": ingreso.nombre,
            "ingresos.$.monto": ingreso.monto,
            "ingresos.$.fecha": ingreso.fecha,
            "ingresos.$.categoria": ingreso.categoria,
          },
        },
        { new: true }
      );
      if (!user) {
        throw "Failed to find user";
      }
      res.status(200).send({ ingresos: user.ingresos });
    }
    catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async updateDeuda(req: Request, res: Response) {
    const { correo, id } = req.params;
    const { deuda } = req.body;

    try {
      const user: HydratedDocument<IUser> | null = await this._model.findOneAndUpdate(
        { email: correo, "deudas._id": id },
        {
          $set: {
            "deudas.$.fechaInicio": deuda.fechaInicio,
            "deudas.$.plazos": deuda.plazos,
            "deudas.$.monto": deuda.monto,
            "deudas.$.entidad": deuda.entidad,
            "deudas.$.interes": deuda.interes,
          },
        },
        { new: true }
      );
      if (!user) {
        throw "Failed to find user";
      }
      res.status(200).send({ deudas: user.deudas });
    }
    catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }


}

export default UserController;
