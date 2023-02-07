import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useGetAllScoresQuery} from '../../api/scores.api';

const ScoreboardScreen: React.FC = () => {
  const {data, isLoading, isError} = useGetAllScoresQuery();
  console.log('all', data, isLoading, isError);
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
