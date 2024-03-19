import {
  UserActionTypes,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_SUCCESS,
} from "../actions/actionConnection.ts";

interface UserState {
  user: User | null;
  isConnected: boolean;
}
const initialState: UserState = {
  user: null,
  isConnected: false,
};

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isConnected: true,
      };
    case LOGOUT:
      return { ...state, user: null, isConnected: false };
    default:
      return state;
  }
};
