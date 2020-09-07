import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");

interface BackgroundColor {
  backgroundColor: string;
}

export const Container = styled.KeyboardAvoidingView`
  flex:1;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
`;

export const Head = styled.View<BackgroundColor>`
  height: 30%;
  width: 100%;
  background: ${ props => props.backgroundColor };
  border-bottom-right-radius: 75px;
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
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 60px;
  font-weight: bold;
  color: #FFFFFF;
`;

export const Footer = styled.View`
  flex: 1;
`;

export const FooterBorder = styled.View<BackgroundColor>`
  background: ${ props => props.backgroundColor };
`;

export const FooterContent = styled.View`
  flex: 1;
  width: ${ width }px;
  background: #FFF;
  border-top-left-radius: 75px;
  align-items: center;
`;

export const Form = styled.ScrollView`
  flex:1;
  align-self: stretch;
  padding: 0px 30px;
  margin-top: 30px;
`;

export const Anchor = styled.TouchableOpacity`

`;

export const AnchorText = styled.Text`
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  color: #999999;
  text-align: center;
  margin-top: 40px;
`;
