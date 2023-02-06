import React from 'react';
import {Text, Pressable, TextStyle, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

interface TextButtonProps {
  onPress: () => any;
  title: string;
  style?: TextStyle | TextStyle[];
  disabled?: boolean;
}

const TextButton: React.FC<TextButtonProps> = ({
  onPress,
  style,
  title,
  disabled,
}: TextButtonProps) => {
  return (
    <Pressable
      hitSlop={10}
      disabled={disabled ?? false}
      style={({pressed}) => [
        {
          opacity: pressed || disabled ? 0.8 : 1,
        },
        style,
        styles.button,
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.BLACK,
    borderRadius: 20,
    minWidth: 250,
  },
  text: {
    color: COLORS.WHITE,
    textAlign: 'center',
    lineHeight: 24,
    paddingVertical: 8,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TextButton;
