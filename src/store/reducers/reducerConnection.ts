import {
  UserActionTypes,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_SUCCESS,
} from "../actions/actionConnection.ts";

export interface UserDetail {
  id: string;
  name: string;
  email: string;
  isConnected: boolean;
  jwt: string;
}

export interface User {
  user: UserDetail;
  isConnected: boolean;
}

export interface UserState {
  user: User | null;
  isConnected: boolean;
}
const initialState: UserState = {
  user: null,
  isConnected: false,
};

export const userReducer = (
  state: UserState = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return { ...state, user: action.payload as User };
    case LOGOUT:
      return { ...state, user: null, isConnected: false };
    default:
      return state;
  }
};
