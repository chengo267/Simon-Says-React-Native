import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TextButton from '../../components/TextButton';
import {HOME_STRINGS} from '../../constants/strings';
import SimonBoard from './components/SimonBoard';

const SimonGameScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <TextButton
        title={HOME_STRINGS.start}
        style={styles.startButton}
        onPress={() => {}}
        disabled={false}
      />
      <Text style={styles.text}>Score: {}</Text>
      <SimonBoard />
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
