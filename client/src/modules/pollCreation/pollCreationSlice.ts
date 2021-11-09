import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface PollCreationState {
  choices: Array<string>;
  dialogOpened: boolean;
}

const getLocalState = (): PollCreationState | null => {
  try {
    const serializedState = localStorage.getItem("pollCreationState");
    if (serializedState === null) return serializedState;
    return JSON.parse(serializedState) as PollCreationState;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getInitialState = (): PollCreationState => {
  const localState = getLocalState();

  if (localState === null)
    return {
      choices: ["", ""],
      dialogOpened: false,
    };

  localState.dialogOpened = false;

  return localState;
};

const saveState = (state: PollCreationState) => {
  try {
    localStorage.setItem("pollCreationState", JSON.stringify(state));
  } catch (error) {
    console.log(error);
  }
};

const initialState = getInitialState();

export const pollCreationSlice = createSlice({
  name: "pollCreation",
  initialState,
  reducers: {
    addChoice: (state) => {
      if (state.choices.length >= 10) {
        alert("A poll cannot have more than 10 choices");
        return;
      }
      state.choices.push("");
      saveState(state);
    },
    updateChoice: (
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) => {
      state.choices[action.payload.index] = action.payload.value;
      saveState(state);
    },
    removeChoice: (state, action: PayloadAction<number>) => {
      if (state.choices.length <= 2) {
        alert("A poll needs at least 2 choices");
        return;
      }
      try {
        const removedChoice = state.choices.splice(action.payload, 1);
        console.log("Removed choice", removedChoice);
      } catch (error) {
        console.log(error);
      }
      saveState(state);
    },
    openDialog: (state) => {
      state.dialogOpened = true;
      saveState(state);
    },
    closeDialog: (state) => {
      state.dialogOpened = false;
      saveState(state);
    },
  },
});

export const {
  addChoice,
  updateChoice,
  removeChoice,
  openDialog,
  closeDialog,
} = pollCreationSlice.actions;

export const selectChoices = (state: RootState) => state.pollCreation.choices;
export const selectDialogOpened = (state: RootState) =>
  state.pollCreation.dialogOpened;

export default pollCreationSlice.reducer;
