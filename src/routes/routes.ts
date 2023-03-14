import express, { NextFunction, Request, Response } from "express";
import { IEmail } from "../entities/email";
import EmailController from "../controllers/email-controller";

const emailController = new EmailController();
const routes = express.Router();

routes.post(
  "/email",
  (request: Request, response: Response, next: NextFunction) => {
    const email: IEmail = request.body.email;
    return emailController.createEmail(email, response);
  }
);

routes.post(
  "/message",
  (request: Request, response: Response, next: NextFunction) => {
    return emailController.createMessage(request, response);
  }
);

routes.post(
  "/send",
  (request: Request, response: Response, next: NextFunction) => {
    return emailController.sendMessage(response);
  }
);

export default routes;
