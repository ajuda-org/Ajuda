import React from "react";
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from "../../contexts/theme";

import { ButtonContainer, Text } from "./styles";

interface IButton {
  text: string;
  color?: string;
}

const Button: React.FC<IButton & TouchableOpacityProps> = ({ text, color, disabled,  ...rest }) => {
  const { theme } = useTheme();

  return (
    <ButtonContainer
      disabled={disabled}
      backgroundColor={color ? color : theme.PrimaryColor}
      {...rest}
    >
      <Text>
        { text }
      </Text>
    </ButtonContainer>
  );
}

export default Button;