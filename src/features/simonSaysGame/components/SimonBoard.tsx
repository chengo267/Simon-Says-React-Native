import React from 'react';
import {StyleSheet, View} from 'react-native';
import ContentButton from '../../../components/ContentButton';
import {COLORS} from '../../../constants/colors';
import {useAppSelector} from '../../../store/store';

const SimonBoard: React.FC = () => {
  const isSimonSays = useAppSelector(state => state.simonSays.isSimonSays);
  return (
    <View style={styles.board}>
      <View style={styles.rowButtons}>
        <ContentButton
          content={<View style={[styles.button, styles.greenB]} />}
          onPress={() => {}}
          disabled={isSimonSays}
        />
        <ContentButton
          content={<View style={[styles.button, styles.redB]} />}
          onPress={() => {}}
          disabled={isSimonSays}
        />
      </View>
      <View style={styles.rowButtons}>
        <ContentButton
          content={<View style={[styles.button, styles.yellowB]} />}
          onPress={() => {}}
          disabled={isSimonSays}
        />
        <ContentButton
          content={<View style={[styles.button, styles.blueB]} />}
          onPress={() => {}}
          disabled={isSimonSays}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 110,
    width: 110,
    borderRadius: 55,
    margin: 8,
  },
  yellowB: {
    backgroundColor: COLORS.YELLOW,
  },
  redB: {
    backgroundColor: COLORS.RED,
  },
  blueB: {
    backgroundColor: COLORS.BLUE,
  },
  greenB: {
    backgroundColor: COLORS.GREEN,
  },
  rowButtons: {
    flexDirection: 'row',
  },
  board: {
    alignSelf: 'center',
  },
});

export default SimonBoard;
