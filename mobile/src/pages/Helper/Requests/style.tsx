import styled from 'styled-components/native';
import Constants from "expo-constants";
import MapView, { Marker as MapMarker } from "react-native-maps";

export const Container = styled.View`
  flex: 1;
  padding: 0px 32px;
  padding-top: ${ 20 + Constants.statusBarHeight }px
`;

export const TextContainer = styled.View`
  border-left-width: 5px;
  border-left-color: #54C7C0;
  padding: 10px;
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
`;

export const Description = styled.Text`
  color: #6C6C80;
  font-size: 16px;
  margin-top: 2px;
`;

export const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
  border-width: 2px;
  border-color: #EEE;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const Marker = styled(MapMarker)`
  width: 90px;
  height: 80px;
`;

export const MapMarkerContainer = styled.View`
  width: 90px;
  height: 70px;
  background-color: #34CB79;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
`;

export const MapMarkerImage = styled.Image`
  width: 90px;
  height: 45px;
  resize-mode: cover;
`;

export const MapMarkerTitle = styled.Text`
  flex: 1px;
  color: #FFF;
  font-size: 12px;
  line-height: 23px;
`;

export const ItemsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const Items = styled.TouchableOpacity<{selected: boolean}>`
  background-color: #fff;
  border-width: 2px;
  border-color: ${props => props.selected ? "#34CB79" : "#eee" };
  height: 120px;
  width: 120px;
  border-radius: 8px;
  padding: 0px 16px;
  padding-top: 20px;
  padding-bottom: 16px;
  margin-right: 8px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

export const ItemTitle = styled.Text<{selected: boolean}>`
  color: ${props => props.selected ? "#34CB79" : "#204442" };
  text-align: center;
  font-size: 18px;
`;
