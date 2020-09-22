import { RectButton } from "react-native-gesture-handler";
import {Platform} from 'react-native'
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import styled from "styled-components/native";

const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Container = styled.View`
  height: ${hp('100%')}px;
  background: #516DF5;
  justify-content: center;
  padding: 0 30px;
  padding-top: ${statusBarHeight}px;
`;

export const Title = styled.Text`
  color: #FFF;
  height: ${hp('5%')}px;
  margin-bottom: ${hp('1%')}px;
  font-size: 30px;
  /* margin-top: 40px; */
  font-weight: bold;
`;

export const Banner = styled.Image`
  width: 100%;
  height: ${hp('30%')}px;
  margin-bottom: ${hp('6%')}px;
  resize-mode: contain;
`;

export const TitleBold = styled.Text`
  color: #FFF;
  height: ${hp('5%')}px;
  margin-bottom: ${hp('6%')}px;
  font-size: 25px;
  font-weight: normal;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  height: ${hp('28%')}px;
  margin-bottom: ${hp('6%')}px;
  justify-content: space-between;
`;

export const ButtonPrimary = styled(RectButton)`
  width: 48%;
  background-color: #7189FC;
  border-radius: 20px;
  padding: 14px;
  justify-content: space-between;
`;

export const ButtonSecondary = styled(RectButton)`
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
  height: ${hp('10%')}px;
  max-width: 160px;
`;
