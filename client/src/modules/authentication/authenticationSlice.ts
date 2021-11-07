import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface AuthenticationState {
  isAuthenticated: boolean;
}

const getLocalState = (): AuthenticationState | null => {
  try {
    const serializedState = localStorage.getItem("authenticationState");
    if (serializedState === null) return serializedState;
    return JSON.parse(serializedState) as AuthenticationState;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getInitialState = (): AuthenticationState => {
  const localState = getLocalState();

  if (localState === null)
    return {
      isAuthenticated: false,
    };

  return localState;
};

const saveState = (state: AuthenticationState) => {
  try {
    localStorage.setItem("authenticationState", JSON.stringify(state));
  } catch (error) {
    console.log(error);
  }
};

const initialState = getInitialState();

export const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAuthenticated = true;
      saveState(state);
    },
    signout: (state) => {
      state.isAuthenticated = false;
      saveState(state);
    },
  },
});

export const { signin, signout } = authenticationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsAuthenticated = (state: RootState) =>
  state.authentication.isAuthenticated;

export default authenticationSlice.reducer;
