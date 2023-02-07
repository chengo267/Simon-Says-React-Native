import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {SimonSaysColors} from '../../../models/simon.models';
import Sound from 'react-native-sound';

export interface simonSaysState {
  sequence: SimonSaysColors[];
  isSimonSays: boolean;
  score: number;
  userSequence: SimonSaysColors[];
  activeColor: SimonSaysColors;
  sounds: (Sound | undefined)[];
  isGameOver: boolean;
}

const initialState: simonSaysState = {
  sequence: [],
  isSimonSays: false,
  score: 0,
  userSequence: [],
  activeColor: -1,
  sounds: [],
  isGameOver: false,
};

export const simonSaysSlice = createSlice({
  name: 'simonSaysSlice',
  initialState,
  reducers: {
    setSequence: (state, action: PayloadAction<SimonSaysColors[]>) => {
      state.sequence = action.payload;
    },
    setIsSimonSays: (state, action: PayloadAction<boolean>) => {
      state.isSimonSays = action.payload;
    },
    resetUserSequence: state => {
      state.userSequence = [];
    },
    appendUserStep: (state, action: PayloadAction<SimonSaysColors>) => {
      if (state.userSequence.length < state.sequence.length) {
        state.userSequence = [...state.userSequence, action.payload];
        const len = state.userSequence.length;
        if (state.userSequence[len - 1] !== state.sequence[len - 1]) {
          state.isGameOver = true;
        }
      }
      if (
        state.userSequence.length === state.sequence.length &&
        !state.isGameOver
      ) {
        state.score = state.score + 1;
      }
    },
    appendSimonStep: (state, action: PayloadAction<SimonSaysColors>) => {
      state.sequence = [...state.sequence, action.payload];
    },
    setActiveColor: (state, action: PayloadAction<SimonSaysColors>) => {
      state.activeColor = action.payload;
    },
    setSounds: (state, action: PayloadAction<(Sound | undefined)[]>) => {
      state.sounds = action.payload ?? [];
    },
    setIsGameOver: (state, action: PayloadAction<boolean>) => {
      state.isGameOver = action.payload;
    },
    restartGame: () => initialState,
  },
});

export const {
  setSequence,
  setIsSimonSays,
  appendUserStep,
  setActiveColor,
  appendSimonStep,
  resetUserSequence,
  setSounds,
  setIsGameOver,
  restartGame,
} = simonSaysSlice.actions;

export default simonSaysSlice.reducer;
