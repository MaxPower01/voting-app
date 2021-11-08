import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface SurveyCreationState {
  choices: Array<string>;
}

const getLocalState = (): SurveyCreationState | null => {
  try {
    const serializedState = localStorage.getItem("surveyCreationState");
    if (serializedState === null) return serializedState;
    return JSON.parse(serializedState) as SurveyCreationState;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getInitialState = (): SurveyCreationState => {
  const localState = getLocalState();

  if (localState === null)
    return {
      choices: [],
    };

  return localState;
};

const saveState = (state: SurveyCreationState) => {
  try {
    localStorage.setItem("surveyCreationState", JSON.stringify(state));
  } catch (error) {
    console.log(error);
  }
};

const initialState = getInitialState();

export const surveyCreationSlice = createSlice({
  name: "surveyCreation",
  initialState,
  reducers: {
    addChoice: (state, newChoice) => {
      state.choices.push(newChoice.payload);
      saveState(state);
    },
    removeChoice: (state, index) => {
      if (state.choices.length <= 2) return;
      try {
        state.choices.splice(index.payload, 1);
      } catch (error) {
        console.log(error);
      }
      saveState(state);
    },
  },
});

export const { addChoice, removeChoice } = surveyCreationSlice.actions;

export const selectSurveyCreationChoices = (state: RootState) =>
  state.surveyCreation.choices;

export default surveyCreationSlice.reducer;
