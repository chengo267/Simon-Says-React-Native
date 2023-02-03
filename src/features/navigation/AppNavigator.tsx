import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationReadiness, navigationRef} from './RootNavigation';
import {RootStackParamList, Screens} from '../../constants/screens';
import HomeScreen from '../Home/HomeScreen';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        navigationReadiness.setIsReady(true);
      }}>
      <StackNavigator.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={Screens.Home}>
        <StackNavigator.Screen name={Screens.Home} component={HomeScreen} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
