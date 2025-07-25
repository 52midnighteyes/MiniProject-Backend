export interface IUserParams {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  role: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: IUserParams;
    }
  }
}
