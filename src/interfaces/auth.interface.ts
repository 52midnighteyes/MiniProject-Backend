export interface IRegisterParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role_id: string;
  referral_code: string;
}

export type IVerifyUserParam = string;

export interface ILoginParams {
  email: string;
  password: string;
}
