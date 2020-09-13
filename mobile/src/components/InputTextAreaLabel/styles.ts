import styled from 'styled-components/native';

interface IInput {
  placeholder: string;
  isFocused: boolean;
  borderColor: string;
  error: boolean;
}

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
  height: 100px;
  width: 100%;
  text-align-vertical: top;
  padding: 15px;
  border: ${props => props.isFocused ? `4px solid ${props.borderColor}` : "1px solid #DDDDDD" };
  border-radius: 20px;
  color: #999999;
  font-size: 18px;
  ${
    props => props.error && !props.isFocused && "border-color: #F63535"
  }
`;

export const ErrorMessage = styled.Text`
  font-size: 10px;
  color: #F63535;
  margin-left: 10px;
  margin-top: 5px;
`;
