import styled from 'styled-components/native';

interface IInput {
  placeholder: string;
  marginBotom?: number;
  isFocused: boolean;
  borderColor: string;
}

export const Container = styled.View`
  width: 100%;
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.Text`
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

export const Input = styled.TextInput<IInput>`
  height: 55px;
  width: 100%;
  padding: 15px;
  border: ${props => props.isFocused ? `4px solid ${props.borderColor}` : "1px solid #DDDDDD" };
  border-radius: 20px;
  margin-bottom: ${props =>props.marginBotom}px;
  color: #999999;
  font-size: 18px;
`;
