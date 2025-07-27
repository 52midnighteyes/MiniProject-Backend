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

export interface IResetPasswordParams {
  email: string;
  old_password: string;
  new_password: string;
}

export interface IForgotPasswordParams {
  password: string;
  email: string;
  token: string;
}

export type IForgotPasswordReqParam = string;
