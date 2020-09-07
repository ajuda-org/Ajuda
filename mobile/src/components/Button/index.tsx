import React from "react";
import { TouchableOpacity } from 'react-native';
import { useTheme } from "../../contexts/theme";

import { ButtonContainer, Text } from "./styles";

interface IButton {
  text: string;
}

const Button: React.FC<IButton & React.RefObject<TouchableOpacity>> = ({ text,  ...rest }) => {
  const { theme } = useTheme();

  return (
    <ButtonContainer
      backgroundColor={theme.PrimaryColor}
      {...rest}
    >
      <Text>
        { text }
      </Text>
    </ButtonContainer>
  );
}

export default Button;