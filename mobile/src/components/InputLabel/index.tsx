import React, { RefAttributes } from "react";
import { TextInput } from "react-native"
import {
  Container,
  Label,
  Input
} from "./styles";

interface IInputLabel {
  label: string;
  marginBotom?: number;
}

const InputLabel: React.FC<IInputLabel|RefAttributes<TextInput>> = ({ label, placeholder, marginBotom = 0, value, onChangeText, keyboardType }) => {
  return (
    <Container>
      <Label>
        { label }
      </Label>
      <Input
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        marginBotom={marginBotom}
        placeholder={ placeholder }
      />
    </Container>
  );
}

export default InputLabel;