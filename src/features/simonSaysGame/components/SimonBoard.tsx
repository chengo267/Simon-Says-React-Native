import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import ContentButton from '../../../components/ContentButton';
import {COLORS} from '../../../constants/colors';
import {
  simonColorsStrings,
  SimonSaysColors,
} from '../../../models/simon.models';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {nextSimonStep} from '../state/simonSaysActions';
import {appendUserStep} from '../state/simonSaysSlice';

const SimonBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  //   const isSimonSays = useAppSelector(state => state.simonSays.isSimonSays);
  const activeColor = useAppSelector(state => state.simonSays.activeColor);

  const score = useAppSelector(state => state.simonSays.score);

  useEffect(() => {
    score > 0 && dispatch(nextSimonStep());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  const simonButton = (
    simonSaysColor: SimonSaysColors,
    pressedColor: string,
  ) => {
    return (
      <ContentButton
        content={
          <View
            style={[
              styles.button,
              {
                backgroundColor:
                  activeColor === simonSaysColor
                    ? pressedColor
                    : simonColorsStrings[simonSaysColor],
              },
            ]}
          />
        }
        onPress={() => dispatch(appendUserStep(simonSaysColor))}
        // disabled={isSimonSays}
      />
    );
  };

  return (
    <View style={styles.board}>
      <View style={styles.rowButtons}>
        {simonButton(SimonSaysColors.GREEN, COLORS.LIGHT_GREEN)}
        {simonButton(SimonSaysColors.RED, COLORS.LIGHT_RED)}
      </View>
      <View style={styles.rowButtons}>
        {simonButton(SimonSaysColors.YELLOW, COLORS.LIGHT_YELLOW)}
        {simonButton(SimonSaysColors.BLUE, COLORS.LIGHT_BLUE)}
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
  rowButtons: {
    flexDirection: 'row',
  },
  board: {
    alignSelf: 'center',
  },
});

export default SimonBoard;
