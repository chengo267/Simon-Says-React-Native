import React from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';

interface AppButtonProps {
  onPress: () => any;
  content: JSX.Element;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const ContentButton: React.FC<AppButtonProps> = ({
  onPress,
  content,
  style,
  disabled,
}: AppButtonProps) => {
  return (
    <Pressable
      hitSlop={20}
      disabled={disabled ?? false}
      style={({pressed}) => [
        {
          opacity: pressed || disabled ? 0.9 : 1,
        },
        style,
      ]}
      onPress={onPress}>
      {content}
    </Pressable>
  );
};

export default ContentButton;
