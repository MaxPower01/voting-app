import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authenticationReducer from "./modules/authentication/authenticationSlice";
import surveyCreationReducer from "./modules/surveyCreation/surveyCreationSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    surveyCreation: surveyCreationReducer,
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
