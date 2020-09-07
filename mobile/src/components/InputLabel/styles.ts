import styled from 'styled-components/native';

interface IInput {
  placeholder: string;
  marginBotom?: number;
}

export const Container = styled.View`
  width: 100%;
`;

export const Label = styled.Text`
  font-size: 20px;
  color: #444;
  margin-left: 10px;
  margin-bottom: 5px;
`;

export const Input = styled.TextInput<IInput>`
  height: 55px;
  width: 100%;
  padding-left: 30px;
  border: 1px solid #DDDDDD;
  border-radius: 20px;
  margin-bottom: ${props =>props.marginBotom}px;
  color: #999999;
  font-size: 20px;
`;
