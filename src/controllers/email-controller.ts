import { IMessage } from "../entities/message";
import { IEmail } from "../entities/email";
import { checkEmailIsValidate, checkIfEmailExist } from "../middleware/check";
import { throws } from "assert";
import { Response } from "express";

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
    const checkEmail: Boolean = checkIfEmailExist(email, listEmails);
    const validateEmail: Boolean = true; //checkEmailIsValidate(email);
    console.log(checkEmail);
    console.log(this.listEmails);
    if (checkEmail === true) {
      return response.status(400).json({
        message: "Email exist!",
        result: false,
        emails: this.listEmails,
      });
    }
    if (validateEmail === false) {
      return response.status(400).json({
        message: "Email invalid!",
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
}

export default EmailController;
