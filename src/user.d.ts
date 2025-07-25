export interface IUserParams {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: IUserParams;
    }
  }
}
