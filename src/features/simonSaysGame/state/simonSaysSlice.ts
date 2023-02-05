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
      let isGameOver = false;
      if (state.userSequence.length < state.sequence.length) {
        state.userSequence = [...state.userSequence, action.payload];
      }
      if (state.userSequence.length === state.sequence.length) {
        state.sequence.forEach((seq, index) => {
          if (seq !== state.userSequence[index]) {
            // alert restart game
            Alert.alert('GAME OVER2');
            isGameOver = true;
          }
        });
        if (!isGameOver) {
          console.log('!isGameOver');
          state.score = state.score + 1;
        }
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
  restartGame,
} = simonSaysSlice.actions;

export default simonSaysSlice.reducer;
