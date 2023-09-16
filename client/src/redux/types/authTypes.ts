export const AUTH = "AUTH";
export const AUTH_ERROR = "AUTH_ERROR";

export interface User {
  avatar: string;
  email: string;
  password: string;
  username: string;
  __v: number;
  _id: string;
}

export interface AuthSchema {
  user: User | null;
  token: string;
  error: string;
}

export interface AuthActionType {
  type: typeof AUTH;
  payload: AuthSchema;
}

export interface AuthErrorType {
  type: typeof AUTH_ERROR;
  payload: string;
}

export type AuthType = AuthActionType | AuthErrorType;
