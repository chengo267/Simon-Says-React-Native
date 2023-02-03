import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import TextButton from '../../components/TextButton';
import {HOME_STRINGS} from '../../constants/strings';

const HomeScreen: React.FC = () => {
  const renderButtons = () => {
    return (
      <View style={styles.buttonsView}>
        <TextButton title={HOME_STRINGS.start} onPress={() => {}} />
        <TextButton title={HOME_STRINGS.Scoreboard} onPress={() => {}} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/simonLogo.png')}
        style={styles.image}
      />
      {renderButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonsView: {
    height: '20%',
    paddingBottom: 32,
    justifyContent: 'space-around',
  },
});
export default HomeScreen;
