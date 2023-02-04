import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ScoreboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Scoreboard Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ScoreboardScreen;
