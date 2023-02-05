import {MAX_SEQUENCE} from '../../../constants/strings';
import {AppThunk} from '../../../store/store';
import {
  appendSimonStep,
  resetUserSequence,
  restartGame,
  setActiveColor,
  setIsSimonSays,
} from './simonSaysSlice';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');

export const getRandomSequence = () => {
  return Math.floor(Math.random() * MAX_SEQUENCE);
};

export const simonSaying = (): AppThunk => async (dispatch, getState) => {
  const sequence = getState().simonSays.sequence;
  const sounds = getSounds();

  dispatch(setIsSimonSays(true));
  await delay(1000);
  for (let i = 0; i < sequence.length; i++) {
    await delay(1000);
    dispatch(setActiveColor(-1));
    await delay(1000);
    dispatch(setActiveColor(sequence[i]));
    sounds[sequence[i]]?.play();
    await delay(1500);
    dispatch(setActiveColor(-1));
  }
  dispatch(setIsSimonSays(false));
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

export const getSounds = () => {
  const redSound = new Sound(
    require('../../../assets/sounds/redSound.wav'),
    error => {
      if (error) {
        console.log('failed to load the redSound', error);
      }
    },
  );
  const blueSound = new Sound(
    require('../../../assets/sounds/blueSound.wav'),
    error => {
      if (error) {
        console.log('failed to load the blueSound', error);
      }
    },
  );
  const greenSound = new Sound(
    require('../../../assets/sounds/greenSound.wav'),
    error => {
      if (error) {
        console.log('failed to load the greenSound', error);
      }
    },
  );
  const yellowSound = new Sound(
    require('../../../assets/sounds/yellowSound.wav'),
    error => {
      if (error) {
        console.log('failed to load the yellowSound', error);
      }
    },
  );
  return [greenSound, redSound, yellowSound, blueSound];
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
