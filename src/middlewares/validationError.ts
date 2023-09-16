import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

class ValidationErrorMiddleware {
  public static handleErrors(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    return next();
  }
}

export default ValidationErrorMiddleware;
