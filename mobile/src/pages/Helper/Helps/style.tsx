import styled from 'styled-components/native';

export const ItemContainer = styled.TouchableOpacity`
  background-color: #FFFFFF;
  height: 150px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  flex-direction: row;
`;

export const ItemTypeContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 150px;
  background: #54C7C0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const ItemContent = styled.View`
  flex: 1;
  padding: 15px;
  justify-content: space-between;
`;

export const TextContainer = styled.View`

`;

export const Date = styled.Text`
  font-size: 12px;
  line-height: 12px;
  color: #333333;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #333333;
`;

export const HelpedContainer = styled.View`
  flex-direction: row;
`;

export const ImageContainer = styled.View`
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 32px;
  height: 32px;
  resize-mode: cover;
  border-radius: 16px;
`;

export const HelpedInfos = styled.View`
  margin-left: 10px;
`;

export const HelpedName = styled.Text`
  font-size: 14px;
  color: #333333;
`;

export const HelpedPoint = styled.Text`
  font-size: 12px;
  color: #333333;
`;