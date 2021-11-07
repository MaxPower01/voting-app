import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface Choice {
  id: number;
  value: string;
}

interface SurveyCreationState {
  choices: Array<Choice>;
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
    addChoice: (state, payload) => {
      //   state.choices.push({ id: choice.id, value: choice.value });
      saveState(state);
    },
    removeChoice: (state) => {
      //   state.choices = false;
      saveState(state);
    },
  },
});

export const { addChoice, removeChoice } = surveyCreationSlice.actions;

export const selectSurveyCreationChoices = (state: RootState) =>
  state.surveyCreation.choices;

export default surveyCreationSlice.reducer;
