export interface IUserParams {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: {
    id: string;
    name: string;
  };
}

declare global {
  namespace Express {
    export interface Request {
      user?: IUserParams;
    }
  }
}
