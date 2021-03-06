import { createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/userService";
import history from "../utils/history";

const initialState = localStorage.getItem("currentUser")
  ? {
      entities: null,
      isLoading: true,
      auth: { userId: localStorage.getItem("currentUser") },
      error: null,
      isLoggedIn: true,
    }
  : {
      entities: null,
      isLoading: true,
      auth: null,
      error: null,
      isLoggedIn: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested(state) {
      state.isLoading = true;
    },
    usersReceived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    authRequested(state) {
      state.isLoading = true;
      state.error = null;
    },
    authRequestSuccess(state, action) {
      state.auth = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    authRequestFailed(state, action) {
      state.isLoggedIn = false;
      state.error = action.payload;
      state.isLoading = false;
    },
    userLoggedOut(state) {
      state.isLoggedIn = null;
      state.auth = null;
    },
  },
});

const { actions, reducer: usersReducer } = usersSlice;
const {
  usersRequested,
  usersReceived,
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userLoggedOut,
} = actions;

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const data = await userService.get();
    dispatch(usersReceived(data));
  } catch (error) {}
};

export const logIn =
  ({ email, password }) =>
  (dispatch, getState) => {
    dispatch(authRequested());

    const users = getState().users.entities;

    const userIndex = users.findIndex((user) => user.email === email);

    if (users[userIndex]?.password === password) {
      dispatch(authRequestSuccess({ userId: users[userIndex].id }));

      localStorage.setItem("currentUser", users[userIndex].id);
      history.push("/contacts");
    } else {
      dispatch(
        authRequestFailed({ message: "Incorrect pair login - password" })
      );
    }
  };

export const logOut = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  dispatch(userLoggedOut());
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getIsLoading = () => (state) => state.users.isLoading;
export const getCurrentUser = () => (state) => state.users.auth;
export const getCurrentUserData = () => (state) =>
  state.users.entities.filter((user) => user.id === state.users.auth?.userId);
export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
