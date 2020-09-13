import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";

import {
  Container,
  Slider,
  BackgroundContent,
  BackgroundColumn,
  Footer,
  FooterContent,
  FooterColumn,
  ContentColumn,
  TextsContainer,
  Title,
  Description
} from "./styles";
import { useNavigation } from "@react-navigation/native";

import { ArrowLeftButton, Button } from "../../components";

const { width } = Dimensions.get("window");

import { useTheme } from "../../contexts/theme";
import { useProfile } from "../../contexts/profile";

import WallpaperHelped from "../../assets/images/helped/wallpaper.png";
import WallpaperHelper from "../../assets/images/helper/wallpaper.png";

const Welcome: React.FC = ({ navigation }) => {
  const { theme } = useTheme();
  const { profile } = useProfile();
  const { navigate } = useNavigation();

  function handleNavigateToSignUp() {
    navigate("SignIn");
  }

  return (
    <Container>
      <Slider backgroundColor={theme.PrimaryColor}>
        <ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          <BackgroundContent>
            <BackgroundColumn>
              <ArrowLeftButton color="#FFF" onPress={() => navigation.goBack()} />
            </BackgroundColumn>
            <Image source={profile == "Helped" ? WallpaperHelped : WallpaperHelper } />
          </BackgroundContent>
        </ScrollView>
      </Slider>
      <Footer>
        <View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor: theme.PrimaryColor }}
        />
        <FooterContent>
          <FooterColumn>
            <ContentColumn>
              <TextsContainer>
                <Title>
                  Faça a diferença, ajude!
                </Title>

                <Description>
                  Encontre pessoas que precisam de ajuda. {"\n"}
                  Ajude pressoas com tarefas simples.
                </Description>
              </TextsContainer>
              <Button text="Vamos lá!" onPress={() => handleNavigateToSignUp()}/>
            </ContentColumn>
          </FooterColumn>
        </FooterContent>
      </Footer>
    </Container>
  );
};

export default Welcome;
