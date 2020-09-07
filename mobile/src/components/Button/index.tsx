import React from "react";
import { GestureResponderEvent } from 'react-native';
import { useTheme } from "../../contexts/theme";

import { ButtonContainer, Text } from "./styles";

interface IButton {
  text: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Button: React.FC<IButton> = ({ text, onPress }) => {
  const { theme } = useTheme();

  return (
    <ButtonContainer
      backgroundColor={theme.PrimaryColor}
      onPress={onPress}
    >
      <Text>
        { text }
      </Text>
    </ButtonContainer>
  );
}

export default Button;