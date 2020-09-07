import React from "react";
import { useTheme } from "../../contexts/theme";

import { ButtonContainer, Text } from "./styles";

interface IButton {
  text: string;
}

const Button: React.FC<IButton> = ({ text }) => {
  const { theme } = useTheme();

  return (
    <ButtonContainer backgroundColor={theme.PrimaryColor}>
      <Text>
        { text }
      </Text>
    </ButtonContainer>
  );
}

export default Button;