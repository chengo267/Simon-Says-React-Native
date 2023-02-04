import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {SimonSaysColors} from '../../../models/simon.models';

export interface simonSaysState {
  isGameActive: boolean;
  sequence: SimonSaysColors[];
  isSimonSays: boolean;
  score: number;
  userSequence: SimonSaysColors[];
  activeColor: SimonSaysColors;
}

const initialState: simonSaysState = {
  isGameActive: false,
  sequence: [],
  isSimonSays: false,
  score: 0,
  userSequence: [],
  activeColor: -1,
};

export const simonSaysSlice = createSlice({
  name: 'simonSaysSlice',
  initialState,
  reducers: {
    setIsGameActive: (state, action: PayloadAction<boolean>) => {
      state.isGameActive = action.payload;
    },
    setSequence: (state, action: PayloadAction<SimonSaysColors[]>) => {
      state.sequence = action.payload;
    },
    setIsSimonSays: (state, action: PayloadAction<boolean>) => {
      state.isSimonSays = action.payload;
    },
    incrementScore: state => {
      state.score = state.score + 1;
    },
    appendUserStep: (state, action: PayloadAction<SimonSaysColors>) => {
      if (state.userSequence.length < state.sequence.length) {
        state.userSequence = [...state.userSequence, action.payload];
      }
    },
    appendSimonStep: (state, action: PayloadAction<SimonSaysColors>) => {
      state.sequence = [...state.sequence, action.payload];
    },
    setActiveColor: (state, action: PayloadAction<SimonSaysColors>) => {
      state.activeColor = action.payload;
    },
    restartGame: () => {
      return initialState;
    },
  },
});

export const {
  setIsGameActive,
  setSequence,
  setIsSimonSays,
  incrementScore,
  appendUserStep,
  setActiveColor,
  appendSimonStep,
  restartGame,
} = simonSaysSlice.actions;

export default simonSaysSlice.reducer;
