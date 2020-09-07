import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Keyboard
} from "react-native";

import {
  Container,
  Slider,
  BackgroundContent,
  BackgroundColumn,
  TitleContainer,
  Title,
  Footer,
  FooterContent,
  FooterColumn,
  ContentColumn,
  Form,
  SignUpButton,
  SignUpText
} from "./styles";
import { useNavigation } from "@react-navigation/native";

import {
  ArrowLeftButton,
  Button,
  InputLabel
} from "../../components";

const { width } = Dimensions.get("window");

import { useTheme } from "../../contexts/theme";
import { useProfile } from "../../contexts/profile";
import { TouchableOpacity } from "react-native-gesture-handler";

const Welcome: React.FC = ({ navigation }) => {
  const { theme } = useTheme();
  const { profile } = useProfile();
  const { navigate } = useNavigation();

  const [keyboardShow, setKeyboardShow ] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setKeyboardShow(true));
    Keyboard.addListener("keyboardDidHide", () => setKeyboardShow(false));
    
    return () => {
      Keyboard.removeListener("keyboardDidShow", () => setKeyboardShow(true));
      Keyboard.removeListener("keyboardDidHide", () => setKeyboardShow(false));
    };
  
  }, []);

  function handleNavigateToSignUp() {
    navigate("Landing");
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
              <ArrowLeftButton onPress={() => navigate("Landing")} />
            </BackgroundColumn>
            <TitleContainer>
              <Title>
                Ajuda?
              </Title>
            </TitleContainer>
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
              <Form>
                  <InputLabel label="Email" placeholder="Informe seu email" marginBotom={20}/>
                  <InputLabel label="Senha" placeholder="Informe sua senha" marginBotom={40}/>
                  <Button text="Entrar" onPress={() => handleNavigateToSignUp()}/>
                  {!keyboardShow && 
                    <SignUpButton onPress={() => navigate("SignUp")}>
                      <SignUpText>
                        Não possui um conta? Crie uma agora mesmo!
                      </SignUpText>
                    </SignUpButton>
                  }
              </Form>
            </ContentColumn>
          </FooterColumn>
        </FooterContent>
      </Footer>
    </Container>
  );
};

export default Welcome;
