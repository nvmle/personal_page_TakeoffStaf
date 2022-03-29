import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts";
import usersReducer from "./users";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  users: usersReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
