import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TextButton from '../../components/TextButton';
import {HOME_STRINGS} from '../../constants/strings';
import {useAppDispatch, useAppSelector} from '../../store/store';
import GameOverModal from './components/GameOverModal';
import SimonBoard from './components/SimonBoard';
import {startGame} from './state/simonSaysActions';

const SimonGameScreen: React.FC = () => {
  const isGameActive = useAppSelector(state => state.simonSays.isGameActive);
  const score = useAppSelector(state => state.simonSays.score);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <TextButton
        title={HOME_STRINGS.start}
        style={styles.startButton}
        onPress={() => {
          dispatch(startGame());
        }}
        disabled={isGameActive}
      />
      <Text style={styles.text}>{HOME_STRINGS.score + ': ' + score}</Text>
      <SimonBoard />
      <GameOverModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 64,
  },
  text: {
    alignSelf: 'center',
    marginTop: 70,
    fontSize: 25,
    paddingBottom: 64,
  },
  startButton: {
    width: '20%',
    alignSelf: 'center',
  },
});

export default SimonGameScreen;
