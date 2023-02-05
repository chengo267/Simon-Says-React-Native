import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {SimonSaysColors} from '../../../models/simon.models';
import {Alert} from 'react-native';
import Sound from 'react-native-sound';

export interface simonSaysState {
  isGameActive: boolean;
  sequence: SimonSaysColors[];
  isSimonSays: boolean;
  score: number;
  userSequence: SimonSaysColors[];
  activeColor: SimonSaysColors;
  isUserFinished: boolean;
  sounds: (Sound | undefined)[];
  isGameOver: boolean;
}

const initialState: simonSaysState = {
  isGameActive: false,
  sequence: [],
  isSimonSays: false,
  score: 0,
  userSequence: [],
  activeColor: -1,
  isUserFinished: false,
  sounds: [],
  isGameOver: false,
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
    resetUserSequence: state => {
      state.userSequence = [];
    },
    appendUserStep: (state, action: PayloadAction<SimonSaysColors>) => {
      if (state.userSequence.length < state.sequence.length) {
        state.userSequence = [...state.userSequence, action.payload];
        const len = state.userSequence.length;
        console.log('len', len);
        if (state.userSequence[len - 1] !== state.sequence[len - 1]) {
          Alert.alert('GAME OVER2');
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
    setIsUserFinished: (state, action: PayloadAction<boolean>) => {
      state.isUserFinished = action.payload;
    },
    setSounds: (state, action: PayloadAction<(Sound | undefined)[]>) => {
      state.sounds = action.payload ?? [];
    },
    setIsGameOver: (state, action: PayloadAction<boolean>) => {
      state.isGameOver = action.payload;
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
  setIsUserFinished,
  resetUserSequence,
  setSounds,
  setIsGameOver,
  restartGame,
} = simonSaysSlice.actions;

export default simonSaysSlice.reducer;
