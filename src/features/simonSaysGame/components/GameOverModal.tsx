import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TextButton from '../../../components/TextButton';
import {GAME_OVER_STRINGS, HOME_STRINGS} from '../../../constants/strings';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import Modal from 'react-native-modal';
import {COLORS} from '../../../constants/colors';
import {restartGame} from '../state/simonSaysSlice';

const GameOverModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isGameOver = useAppSelector(state => state.simonSays.isGameOver);
  const score = useAppSelector(state => state.simonSays.score);

  return (
    <Modal isVisible={isGameOver} animationIn={'slideInUp'}>
      <View style={styles.modal}>
        <Text style={styles.text}>{GAME_OVER_STRINGS.gameOver}</Text>
        <Text style={styles.text}>{HOME_STRINGS.score + ': ' + score}</Text>
        <TextButton
          title={GAME_OVER_STRINGS.newGame}
          style={styles.startButton}
          onPress={() => {
            dispatch(restartGame());
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 25,
    paddingVertical: 8,
  },
  startButton: {
    width: '20%',
    alignSelf: 'center',
    marginTop: 16,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 0,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 32,
  },
});

export default GameOverModal;
