import styled from 'styled-components/native';

export const Container = styled.View<{marginBotom: number, marginTop: number}>`
  width: 100%;
  margin-bottom: ${props =>props.marginBotom}px;
  margin-top: ${props =>props.marginTop}px;
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #444;
  margin-left: 10px;
  margin-bottom: 5px;
`;

export const LabelTip = styled.Text`
  font-size: 10px;
  color: #999;
  margin-left: 10px;
  margin-bottom: 5px;
`;
