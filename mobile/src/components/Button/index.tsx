import React from "react";
import { GestureResponderEvent } from 'react-native';
import { useTheme } from "../../contexts/theme";

import { ButtonContainer, Text } from "./styles";

interface IButton {
  text: string;
  disabled: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Button: React.FC<IButton> = ({ text, onPress, disabled }) => {
  const { theme } = useTheme();

  return (
    <ButtonContainer
      disabled={disabled}
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