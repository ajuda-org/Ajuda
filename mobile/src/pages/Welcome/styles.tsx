import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");

interface BackgroundColor {
  backgroundColor: string;
}

export const Container = styled.View`
  flex: 1;
  background: #FFF,
`;

export const Slider = styled.View<BackgroundColor>`
  height: ${ 0.61 * height }px;
  border-bottom-right-radius: 75px;
  background: ${ props => props.backgroundColor };
`;

export const BackgroundContent = styled.View`
  width: ${ width }px;
  justify-content: space-between;
  align-items: center;
`;

export const BackgroundColumn = styled.View`
  padding-top: ${ Constants.statusBarHeight + 10 }px;
  width: 90%;
`;

export const Footer = styled.View`
  flex: 1;
`;

export const FooterContent = styled.View`
  flex: 1;
  flex-direction: row;
  width: ${ width }px;
  background: #FFF;
  border-top-left-radius: 75px;
`;

export const FooterColumn = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ContentColumn = styled.View`
  width: ${ width }px;
  height: ${ 0.40 * height }px;
  justify-content: space-around;
  align-items: center;
`;

export const TextsContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #444444;
`;

export const Description = styled.Text`
  text-align: center;
  font-size: 18px;
  color: #999999;
`;
