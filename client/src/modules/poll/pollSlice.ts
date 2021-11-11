import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type VoteDialogState = {
  id: string;
  opened: boolean;
};

interface PollState {
  createPollChoices: Array<string>;
  createPollDialogOpened: boolean;
  voteDialogState: VoteDialogState;
}

const getLocalState = (): PollState | null => {
  try {
    const serializedState = localStorage.getItem("pollState");
    if (serializedState === null) return serializedState;
    return JSON.parse(serializedState) as PollState;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getInitialState = (): PollState => {
  const localState = getLocalState();

  if (localState === null)
    return {
      createPollChoices: ["", ""],
      createPollDialogOpened: false,
      voteDialogState: { id: "", opened: false },
    };

  localState.createPollDialogOpened = false;
  localState.voteDialogState = { id: "", opened: false };

  return localState;
};

const saveState = (state: PollState) => {
  try {
    localStorage.setItem("pollState", JSON.stringify(state));
  } catch (error) {
    console.log(error);
  }
};

const initialState = getInitialState();

export const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    addChoice: (state) => {
      if (state.createPollChoices.length >= 10) {
        alert("A poll cannot have more than 10 choices");
        return;
      }
      state.createPollChoices.push("");
      saveState(state);
    },
    updateChoice: (
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) => {
      state.createPollChoices[action.payload.index] = action.payload.value;
      saveState(state);
    },
    removeChoice: (state, action: PayloadAction<number>) => {
      if (state.createPollChoices.length <= 2) {
        alert("A poll needs at least 2 choices");
        return;
      }
      try {
        const removedChoice = state.createPollChoices.splice(action.payload, 1);
        console.log("Removed choice", removedChoice);
      } catch (error) {
        console.log(error);
      }
      saveState(state);
    },
    resetChoices: (state) => {
      state.createPollChoices = ["", ""];
      saveState(state);
    },
    openCreatePollDialog: (state) => {
      state.createPollDialogOpened = true;
      saveState(state);
    },
    closeCreatePollDialog: (state) => {
      state.createPollDialogOpened = false;
      saveState(state);
    },
    openVoteDialog: (state, action: PayloadAction<string>) => {
      state.voteDialogState = { id: action.payload, opened: true };
      saveState(state);
    },
    closeVoteDialog: (state, action: PayloadAction<string>) => {
      state.voteDialogState = { id: action.payload, opened: false };
      saveState(state);
    },
  },
});

export const {
  addChoice,
  updateChoice,
  removeChoice,
  resetChoices,
  openCreatePollDialog,
  closeCreatePollDialog,
  openVoteDialog,
  closeVoteDialog,
} = pollSlice.actions;

export const selectCreatePollChoices = (state: RootState) =>
  state.poll.createPollChoices;
export const selectCreatePollDialogOpened = (state: RootState) =>
  state.poll.createPollDialogOpened;
export const selectVoteDialogState = (state: RootState) =>
  state.poll.voteDialogState;

export default pollSlice.reducer;
