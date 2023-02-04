import {Alert} from 'react-native';
import {MAX_SEQUENCE} from '../../../constants/strings';
import {SimonSaysColors} from '../../../models/simon.models';
import {AppThunk} from '../../../store/store';
import {
  appendSimonStep,
  resetUserSequence,
  restartGame,
  setActiveColor,
  setIsSimonSays,
} from './simonSaysSlice';

export const getRandomSequence = () => {
  return Math.floor(Math.random() * MAX_SEQUENCE);
};

export const simonSaying = (): AppThunk => async (dispatch, getState) => {
  const sequence = getState().simonSays.sequence;
  dispatch(setIsSimonSays(true));
  await delay(800);
  for (let i = 0; i < sequence.length; i++) {
    await delay(800);
    dispatch(setActiveColor(-1));
    await delay(800);
    dispatch(setActiveColor(sequence[i]));
    await delay(800);

    dispatch(setActiveColor(-1));
  }
  dispatch(setIsSimonSays(false));
};

export const compareSequences = (
  simonSequence: SimonSaysColors[],
  userSequence: SimonSaysColors[],
): boolean => {
  if (simonSequence.length !== userSequence.length) {
    // alert restart game
    Alert.alert('GAME OVER1');
    return false;
  }
  simonSequence.forEach((seq, index) => {
    if (seq !== userSequence[index]) {
      // alert restart game
      Alert.alert('GAME OVER2');
      return false;
    }
  });
  return true;
};

export const nextSimonStep = (): AppThunk => dispatch => {
  dispatch(resetUserSequence());
  const simonNewStep = getRandomSequence();
  dispatch(appendSimonStep(simonNewStep));
  dispatch(simonSaying());
};

export const startGame = (): AppThunk => dispatch => {
  dispatch(restartGame());
  dispatch(nextSimonStep());
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
