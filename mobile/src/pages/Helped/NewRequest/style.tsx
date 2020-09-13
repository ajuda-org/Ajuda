import styled from 'styled-components/native';
import { Dimensions } from "react-native";
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
  margin-bottom: 20px;
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

export const ItemButton = styled.TouchableOpacity<{selected: boolean;}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 15px;
  background-color: #FFF;
  border-radius: 30px;
  height: ${Dimensions.get('window').width / 3}px;
  ${props => props.selected && "border: 4px solid #94A5F5;"}
`;

export const ItemText = styled.Text<{selected: boolean;}>`
  text-align: center;
  font-size: 20px;
  ${props => props.selected && "color: #94A5F5; font-weight: bold;"}
`;
