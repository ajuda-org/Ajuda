import React from "react";

import {
  Container,
  LabelContainer,
  Title,
  LabelTip,
} from "./styles";

interface ILabel {
  labelTip?: string;
  marginBotom?: number;
  marginTop?: number;
}

const Label: React.FC<ILabel> = ({ children, marginBotom = 0, marginTop = 0, labelTip, ...rest }) => {
  return (
    <Container marginBotom={marginBotom} marginTop={marginTop}>
      <LabelContainer>
        <Title>
          { children }
        </Title>

        {labelTip && <LabelTip>
          {labelTip}
        </LabelTip>}
      </LabelContainer>
    </Container>
  );
}

export default Label;