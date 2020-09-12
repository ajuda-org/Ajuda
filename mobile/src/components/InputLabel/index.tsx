import React, { useState } from "react";
import { TextInput } from "react-native"
import {
  Container,
  LabelContainer,
  Label,
  LabelTip,
  Input,
  ErrorMessage
} from "./styles";

import { useTheme } from "../../contexts/theme";

interface error {
  error: string;
  field: string;
}

interface IInputLabel {
  name: string;
  label: string;
  placeholder: string;
  labelTip?: string;
  marginBotom?: number;
  error: error;
}

const InputLabel: React.FC<IInputLabel & React.RefObject<TextInput>> = ({ label, name, placeholder, marginBotom = 0, labelTip, error, ...rest }) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const isError = error.field == name

  return (
    <Container marginBotom={marginBotom}>
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
        error={isError}
        isFocused={isFocused}
        placeholder={ placeholder }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        borderColor={theme.SecondColor}
        // onSubmitEditing={ () => setIsFocused(false)}
      />
      {isError && 
        <ErrorMessage>
          {error.error}
        </ErrorMessage>}
    </Container>
  );
}

export default InputLabel;