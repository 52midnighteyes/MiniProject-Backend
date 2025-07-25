import { types } from "util";

export interface IRegisterParam {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role_id: string;
  referral_code: string;
}

export type IVerifyUserParam = string;
