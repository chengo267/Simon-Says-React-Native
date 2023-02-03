import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SimonGameScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>The Game</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SimonGameScreen;
