import {Alert} from 'react-native/types';
import {MAX_SEQUENCE} from '../../../constants/strings';
import {AppThunk} from '../../../store/store';
import {
  appendSimonStep,
  incrementScore,
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

  return new Promise(async () => {
    await new Promise(() => setTimeout(() => {}, 500));
    sequence.forEach(async seq => {
      dispatch(setActiveColor(-1));
      await new Promise(() => setTimeout(() => {}, 500));
      dispatch(setActiveColor(seq));
      // ADD SOUND
      await new Promise(() => setTimeout(() => {}, 500));
    });
    dispatch(setActiveColor(-1));
    dispatch(setIsSimonSays(false));
  });
};

export const compareSimonVSUserSequence =
  (): AppThunk => (dispatch, getState) => {
    const simonSequence = getState().simonSays.sequence;
    const userSequence = getState().simonSays.userSequence;
    if (simonSequence.length !== userSequence.length) {
      // alert restart game
      Alert.alert('GAME OVER');
      return;
    }
    simonSequence.forEach((seq, index) => {
      if (seq !== userSequence[index]) {
        // alert restart game
        Alert.alert('GAME OVER');
        return;
      }
    });
    dispatch(incrementScore());
  };

export const nextSimonStep = (): AppThunk => dispatch => {
  const simonNewStep = getRandomSequence();
  dispatch(appendSimonStep(simonNewStep));
  dispatch(simonSaying());
};

export const startGame = (): AppThunk => dispatch => {
  dispatch(restartGame());
  dispatch(nextSimonStep());
};
