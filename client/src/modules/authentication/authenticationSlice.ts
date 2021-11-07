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
  name: "authentication",
  initialState,
  reducers: {
    signin: (state) => {
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

export const selectIsAuthenticated = (state: RootState) =>
  state.authentication.isAuthenticated;

export default authenticationSlice.reducer;
