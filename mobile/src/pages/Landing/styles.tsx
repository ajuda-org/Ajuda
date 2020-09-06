import { RectButton } from "react-native-gesture-handler";

import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: #516DF5;
  justify-content: center;
  padding: 40px;
`;

export const Title = styled.Text`
  color: #FFF;
  font-size: 30px;
  line-height: 30px;
  margin-top: 40px;
  font-weight: bold;
`;

export const Banner = styled.Image`
  width: 100%;
  resize-mode: contain;
`;

export const TitleBold = styled.Text`
  color: #FFF;
  font-size: 25px;
  font-weight: normal;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 40px;
  justify-content: space-between;
`;

export const ButtonPrimary = styled(RectButton)`
  height: 200px;
  width: 48%;
  background-color: #7189FC;
  border-radius: 20px;
  padding: 14px;
  justify-content: space-between;
`;

export const ButtonSecondary = styled(RectButton)`
  height: 200px;
  width: 48%;
  background-color: #54C7C0;
  border-radius: 20px;
  padding: 14px;
  justify-content: space-between;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const TotalConnections = styled.Text`
  color: #FFF;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  max-width: 160px;
  margin-top: 40px;
`;
