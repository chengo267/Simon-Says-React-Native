import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useGetAllScoresQuery} from '../../api/scores.api';
import {SCORE_BOARD_STRINGS} from '../../constants/strings';
import {useAppDispatch, useAppSelector} from '../../store/store';
import ScoreItem from './components/ScoreItem';
import {setScoresList} from './state/scoreBoardSlice';

const ScoreboardScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const {data, isLoading} = useGetAllScoresQuery();

  const scoresList = useAppSelector(state => state.scoreBoard.scoresList);

  useEffect(() => {
    dispatch(setScoresList(data ?? []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size={'large'} style={styles.loader} />
      ) : (
        <View>
          <Text style={styles.title}>{SCORE_BOARD_STRINGS.title}</Text>
          <Text style={styles.subTitle}>{SCORE_BOARD_STRINGS.subTitle}</Text>
          <FlatList
            data={scoresList}
            renderItem={({item}) => (
              <ScoreItem scoreItem={item} key={item.id} />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 16,
  },
  subTitle: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 8,
  },
});
export default ScoreboardScreen;
