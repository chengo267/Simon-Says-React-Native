import {COLORS} from '../constants/colors';

export enum SimonSaysColors {
  GREEN,
  RED,
  YELLOW,
  BLUE,
}

export const simonColorsStrings = {
  [SimonSaysColors.GREEN]: COLORS.GREEN,
  [SimonSaysColors.RED]: COLORS.RED,
  [SimonSaysColors.YELLOW]: COLORS.YELLOW,
  [SimonSaysColors.BLUE]: COLORS.BLUE,
};

export interface ScoreData {
  id: string;
  userId: string;
  userName: string;
  score: number;
}

export interface AddScoreReq {
  createdAt: Date;
  userId: string;
  userName: string;
  score: number;
}
