import { IMessage } from "../entities/message";
import { IEmail } from "../entities/email";
import { checkIfEmailExist } from "../middleware/check";
import { Request, Response } from "express";
import { transport } from "../middleware/nodemailer";

const listEmails: Array<IEmail> = new Array<IEmail>();
const message: IMessage = { title: "", message: "" };

class EmailController {
  listEmails: Array<IEmail>;
  message: IMessage;

  constructor() {
    this.listEmails = new Array<IEmail>();
    this.message = { title: "", message: "" };
  }
  async createEmail(email: IEmail, response: Response): Promise<Response> {
    const checkEmail: Boolean = checkIfEmailExist(email, this.listEmails);

    if (checkEmail === true) {
      return response.status(400).json({
        message: "Email exist!",
        result: false,
        emails: this.listEmails,
      });
    } else {
      this.listEmails.push(email);
      return response.status(201).json({
        message: "Email successfully added!",
        result: true,
        emails: this.listEmails,
      });
    }
  }

  async createMessage(request: Request, response: Response): Promise<Response> {
    const { title, message } = request.body;
    if (!title || !message) {
      return response.status(400).json({
        message: "Title or message are empty!",
        result: false,
      });
    }
    this.message = {
      title,
      message,
    };
    return response.status(201).json({
      message: `Registered message!\n ${this.message}`,
      result: true,
      emails: this.listEmails,
    });
  }

  async sendMessage(response: Response): Promise<Response> {
    if (!this.listEmails) {
      return response.status(400).json({
        message: "List Emails are empty!",
        result: false,
      });
    }
    if (!this.message) {
      return response.status(400).json({
        message: "Message are empty!",
        result: false,
      });
    }
    const mailOptions = {
      from: "no-reply@joaovictor.com",
      to: "",
      subject: "",
      text: "",
    };
    for (var email in this.listEmails) {
      mailOptions.to = email;
      mailOptions.subject = this.message.title;
      mailOptions.text = this.message.message;
      transport.sendMail(mailOptions, (error: unknown, info: any) => {
        if (error) {
          return response.status(400).json({
            message: error,
            result: false,
          });
        } else {
          console.log("Email enviado: " + info.response);
        }
      });
    }
    return response.status(200).json({
      message: "Send emails!",
      result: true,
    });
  }
}

export default EmailController;
