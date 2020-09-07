import React from "react";
import {
  Container,
  Label,
  Input
} from "./styles";

interface IInputLabel {
  label: string;
  placeholder: string;
  marginBotom?: number;
}

const InputLabel: React.FC<IInputLabel> = ({ label, placeholder, marginBotom = 0 }) => {
  return (
    <Container>
      <Label>
        { label }
      </Label>
      <Input
        marginBotom={marginBotom}
        placeholder={ placeholder }
      />
    </Container>
  );
}

export default InputLabel;