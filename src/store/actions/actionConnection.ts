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
    payload: user,
  };
};

export const logout = (): UserActionTypes => ({
  type: LOGOUT,
});

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";

export const signupSuccess = (user) => {
  if (!user._id) {
    throw new Error("User ID is missing in the payload");
  }
  return {
    type: SIGNUP_SUCCESS,
    payload: user,
  };
};
