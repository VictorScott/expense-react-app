import { SET_FIRST_NAME, SET_LAST_NAME } from "../types/index";

const INITIAL_STATE = {
  firstName: "John",
  lastName: "Doe",
  message: "",
};

export default function nameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FIRST_NAME:
      return {
        ...state,
        ...action.payload,
      };
    case SET_LAST_NAME:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return INITIAL_STATE;
  }
};
