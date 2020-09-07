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
  height: ${ 0.31* height }px;
  border-bottom-right-radius: 75px;
  background: ${ props => props.backgroundColor };
`;

export const BackgroundContent = styled.View`
  width: ${ width }px;
  align-items: center;
`;

export const BackgroundColumn = styled.View`
  padding-top: ${ Constants.statusBarHeight + 10 }px;
  width: 90%;
`;

export const TitleContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 80px;
  font-weight: bold;
  color: #FFFFFF;
`;

export const Footer = styled.View`
  flex: 1;
`;

export const FooterContent = styled.View`
  flex: 1;
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
  height: 100%;
  padding: 20px;
  justify-content: space-around;
  align-items: center;
`;

export const Form = styled.View`
  width: 100%;
  align-items: center;
`;

export const SignUpButton = styled.Text`
  margin-top: 20px;
`;

export const SignUpText = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  color: #999999;
`;