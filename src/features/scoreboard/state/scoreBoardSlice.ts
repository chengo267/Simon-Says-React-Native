import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ScoreData} from '../../../models/simon.models';

export interface scoreBoardState {
  scoresList: ScoreData[];
}

const initialState: scoreBoardState = {
  scoresList: [],
};

export const scoreBoardSlice = createSlice({
  name: 'scoreBoardSlice',
  initialState,
  reducers: {
    setScoresList: (state, action: PayloadAction<ScoreData[]>) => {
      state.scoresList = action.payload;
    },
    removeScore: (state, action: PayloadAction<string>) => {
      const newList = state.scoresList.filter(obj => obj.id !== action.payload);
      state.scoresList = newList;
    },
  },
});

export const {setScoresList, removeScore} = scoreBoardSlice.actions;

export default scoreBoardSlice.reducer;
