export type RootStackParamList = {
  Home: undefined;
  SimonGame: undefined;
  Scoreboard: undefined;
};

export const Screens: {
  Home: keyof RootStackParamList;
  Scoreboard: keyof RootStackParamList;
  SimonGame: keyof RootStackParamList;
} = {
  Home: 'Home',
  Scoreboard: 'Scoreboard',
  SimonGame: 'SimonGame',
};
