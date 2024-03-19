export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type UserActionTypes = LoginSuccessAction | LogoutAction;

export const loginSuccess = (user: User): UserActionTypes => {
  if (!user.id) {
    throw new Error("User ID is missing in the payload");
  }
  return {
    type: LOGIN_SUCCESS,
    payload: {
      id: user.id,
      email: user.email,
      jwt: user.jwt,
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
  if (!user.id) {
    throw new Error("User ID is missing in the payload");
  }
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      id: user.id,
      email: user.email,
      jwt: user.jwt,
    },
  };
};
