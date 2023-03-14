import { IMessage } from "../entities/message";
import { IEmail } from "../entities/email";

export function checkIfEmailExist(value: IEmail, list: Array<IEmail>): Boolean {
  if (list.length === 0) {
    return false;
  } else {
    const res = list.find((element) => element.email == value.email);
    return res ? res !== undefined : true;
  }
}
