import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDeleteScoreMutation} from '../../../api/scores.api';
import ContentButton from '../../../components/ContentButton';
import {ScoreData} from '../../../models/simon.models';
import {useAppDispatch} from '../../../store/store';
import {getUserId} from '../../../utils/firebaseUtils';
import {removeScore} from '../state/scoreBoardSlice';

interface ScoreItemProps {
  scoreItem: ScoreData;
}

const ScoreItem: React.FC<ScoreItemProps> = ({scoreItem}: ScoreItemProps) => {
  const [deleteScore, _res] = useDeleteScoreMutation();
  const dispatch = useAppDispatch();
  const loggedInUser = getUserId();

  const deletePressed = (id: string) => {
    deleteScore(id).then(() => {
      dispatch(removeScore(id));
    });
  };
  return (
    <View style={styles.item}>
      <View style={{...styles.trash, ...styles.trashArea}}>
        {loggedInUser === scoreItem.userId && (
          <ContentButton
            content={
              <Image
                source={require('../../../assets/trash.png')}
                style={styles.trash}
              />
            }
            onPress={() => deletePressed(scoreItem.id)}
          />
        )}
      </View>
      <View style={styles.card}>
        <Text>{scoreItem.userName}</Text>
        <Text>{scoreItem.score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  card: {
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    padding: 8,
    borderColor: 'gray',
    width: '70%',
    alignSelf: 'center',
    minHeight: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 8,
  },
  text: {
    fontSize: 25,
    paddingVertical: 8,
  },
  trash: {
    width: 20,
    height: 20,
  },
  trashArea: {
    alignItems: 'center',
    padding: 16,
  },
});
export default ScoreItem;
