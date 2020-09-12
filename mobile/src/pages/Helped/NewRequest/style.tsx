import styled from 'styled-components/native';
import Constants from "expo-constants";

export const Container = styled.View<{color: string;}>`
  flex: 1;
  background: ${props => props.color};
  padding: 0px 32px;
  padding-top: ${ 20 + Constants.statusBarHeight }px
`;

export const TextContainer = styled.View`
  padding: 10px;
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-size: 40px;
  color: #FFF;
  font-weight: bold;
`;

export const Description = styled.Text`
  color: #6C6C80;
  font-size: 16px;
  margin-top: 2px;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 15px;
  position: absolute;
  bottom: 0px;
  width: 100%;
`;