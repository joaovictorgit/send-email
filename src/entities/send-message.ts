import { IEmail } from "./email";
import { IMessage } from "./message";

export interface ISendMessage {
  emails: Array<IEmail>;
  message: IMessage;
}
