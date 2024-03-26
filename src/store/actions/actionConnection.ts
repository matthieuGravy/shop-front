import { User } from "../reducers/reducerConnection";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LogoutAction {
  type: typeof LOGOUT;
}
interface UnknownAction {
  type: string;
  payload?: unknown;
}

export type UserActionTypes = LoginSuccessAction | LogoutAction | UnknownAction;

export const loginSuccess = (user: User): UserActionTypes => {
  if (!user.user.id) {
    throw new Error("User ID is missing in the payload");
  }
  return {
    type: LOGIN_SUCCESS,
    payload: {
      id: user.user.id,
      email: user.user.email,
      jwt: user.user.jwt,
    },
  };
};

export const logout = (): UserActionTypes => {
  return {
    type: LOGOUT,
  };
};

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";

export const signupSuccess = (user: User): UserActionTypes => {
  if (!user.user.id) {
    throw new Error("User ID is missing in the payload");
  }
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      id: user.user.id,
      email: user.user.email,
      jwt: user.user.jwt,
    },
  };
};
