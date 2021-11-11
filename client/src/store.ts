import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authenticationReducer from "./modules/authentication/authenticationSlice";
import pollReducer from "./modules/poll/pollSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    poll: pollReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
