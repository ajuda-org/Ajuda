import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

interface SliderProps {
  title: string;
  right?: boolean;
}

export const SLIDE_HEIGHT = 0.31 * height;

import {
  BackgroundContent,
  BackgroundColumn,
} from "../SignIn/styles";

import { ArrowLeftButton } from "../../components";

const Slide: React.FC<SliderProps> = () => {
  const { navigate } = useNavigation();

  return (
    <BackgroundContent>
      <BackgroundColumn>
        <ArrowLeftButton onPress={() => navigate("SignIn")} />
      </BackgroundColumn>
      <View style={{flex: 1, width, marginLeft: 50, justifyContent: "center"}}>
        <Text style={{ fontSize: 65, fontWeight: "bold", color: '#FFF' }}>
          Criar {"\n"} 
          Conta
        </Text>
      </View>
    </BackgroundContent>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
  },
  pictureContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    borderBottomRightRadius: 75,
  },
  title: {
    fontSize: 80,
    lineHeight: 80,
    color: "white",
    textAlign: "center",
  },
});

export default Slide;
