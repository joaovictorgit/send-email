import { IMessage } from "../entities/message";
import { IEmail } from "../entities/email";

export function checkIfEmailExist(value: IEmail, list: Array<IEmail>): Boolean {
  if (list.length === 0) {
    return false;
  }
  const res = list.includes(value);
  return res;
}

export function checkEmailIsValidate(checkEmail: IEmail): Boolean {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (checkEmail.email.match(validRegex)) {
    return true;
  }
  return false;
}
