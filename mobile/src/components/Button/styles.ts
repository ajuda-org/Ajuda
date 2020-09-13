import styled from 'styled-components/native';

interface IButton {
  backgroundColor: string;
}

export const ButtonContainer = styled.TouchableOpacity<IButton>`
  background: ${ props => props.backgroundColor };
  height: 60px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  ${props => props.disabled && "opacity: 0.5;"}
`;

export const Text = styled.Text`
  color: #FFFFFF;
  font-size: 30px;
`;
