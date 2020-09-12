import React from "react";
import { TouchableOpacity } from 'react-native';
import { useTheme } from "../../contexts/theme";

import { ButtonContainer, Text } from "./styles";

interface IButton {
  text: string;
  color?: string;
}

const Button: React.FC<IButton & React.RefObject<TouchableOpacity>> = ({ text, color ,  ...rest }) => {
  const { theme } = useTheme();

  return (
    <ButtonContainer
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