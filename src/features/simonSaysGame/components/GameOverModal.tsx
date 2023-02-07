import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import TextButton from '../../../components/TextButton';
import {GAME_OVER_STRINGS, HOME_STRINGS} from '../../../constants/strings';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import Modal from 'react-native-modal';
import {COLORS} from '../../../constants/colors';
import {restartGame} from '../state/simonSaysSlice';
import ContentButton from '../../../components/ContentButton';
import {useAddScoreMutation} from '../../../api/scores.api';
import {getUserId} from '../../../utils/firebaseUtils';
import {navigate} from '../../navigation/RootNavigation';

const GameOverModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isGameOver = useAppSelector(state => state.simonSays.isGameOver);
  const score = useAppSelector(state => state.simonSays.score);
  const [name, setName] = useState('');
  const [addScore, _res] = useAddScoreMutation();

  const renderUserNameField = () => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.entryInput}
          placeholder={GAME_OVER_STRINGS.userName}
          value={name}
          onChangeText={newText => setName(newText)}
        />
        <ContentButton
          style={styles.inputButton}
          onPress={() => {
            addScore({
              createdAt: new Date(),
              userId: getUserId(),
              userName: name,
              score: score,
            }).then(() => {
              dispatch(restartGame());
              navigate('Scoreboard');
            });
          }}
          content={<Text>{GAME_OVER_STRINGS.save}</Text>}
        />
      </View>
    );
  };

  return (
    <Modal isVisible={isGameOver} animationIn={'slideInUp'}>
      <View style={styles.modal}>
        <Text style={styles.text}>{GAME_OVER_STRINGS.gameOver}</Text>
        <Text style={styles.subText}>{HOME_STRINGS.score + ': ' + score}</Text>
        <Text style={styles.subText}>{GAME_OVER_STRINGS.saveScore}</Text>
        {renderUserNameField()}
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
  inputContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 8,
  },
  inputButton: {
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    padding: 8,
    borderColor: 'gray',
    width: 50,
    alignSelf: 'center',
  },
  entryInput: {
    flex: 1,
    height: 50,
    color: 'gray',
    borderBottomWidth: 2,
    backgroundColor: 'white',
    borderColor: 'gray',
    paddingLeft: 55,
  },
  subText: {
    alignSelf: 'center',
    fontSize: 18,
    paddingTop: 8,
  },
});

export default GameOverModal;
