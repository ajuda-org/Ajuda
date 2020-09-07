import React, { useState } from "react";
import { TextInput } from "react-native"
import {
  Container,
  LabelContainer,
  Label,
  LabelTip,
  Input
} from "./styles";

import { useTheme } from "../../contexts/theme";

interface IInputLabel {
  label: string;
  placeholder: string;
  labelTip?: string;
  marginBotom?: number;
}

const InputLabel: React.FC<IInputLabel & React.RefObject<TextInput>> = ({ label, placeholder, marginBotom = 0, labelTip, ...rest }) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <LabelContainer>
        <Label>
          { label }
        </Label>

        {labelTip && <LabelTip>
          {labelTip}
        </LabelTip>}
      </LabelContainer>
      <Input
        {...rest}
        isFocused={isFocused}
        marginBotom={marginBotom}
        placeholder={ placeholder }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        borderColor={theme.SecondColor}
        // onSubmitEditing={ () => setIsFocused(false)}
      />
    </Container>
  );
}

export default InputLabel;