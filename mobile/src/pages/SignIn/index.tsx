import React, { useState } from "react";
import {
  AsyncStorage,
  Platform,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../../contexts/theme";
import { useProfile } from "../../contexts/profile";

import api from "../../services/api";

import { ArrowLeftButton, Button, InputLabel } from "../../components";
import {
  Container,
  Head,
  BackgroundContent,
  BackgroundColumn,
  TitleContainer,
  Title,
  Footer,
  FooterBorder,
  FooterContent,
  Form,
  Anchor,
  AnchorText
} from "./styles";

export default function Login({ navigation }) {
  const { theme } = useTheme();
  const { profile } = useProfile();
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    const response = await api.post("/sessions", {
      email,
      password,
      type: profile.toLowerCase()
    })
    console.log(response.data)
    const id = response.data[0].id;

    await AsyncStorage.setItem("userId", String(id));

    if ( id ) {
      navigate(profile);
    }
      
  };

  return (
    <Container enabled={Platform.OS === "ios"} behavior="padding">
      <Head backgroundColor={theme.PrimaryColor}>
        <BackgroundContent>
          <BackgroundColumn>
            <ArrowLeftButton onPress={() => navigate("Landing")} />
          </BackgroundColumn>
         </BackgroundContent>
         <TitleContainer>
            <Title>
              Ajuda?
            </Title>
          </TitleContainer>
      </Head>
      <Footer>
        <FooterBorder
          backgroundColor={theme.PrimaryColor}
          style={{ ...StyleSheet.absoluteFillObject}}
        />
        <FooterContent>
          <Form>
            <InputLabel
              value={email}
              onChangeText={setEmail}
              label="Email"
              placeholder="Seu email"
              marginBotom={20}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <InputLabel
              value={password}
              onChangeText={setPassword}
              label="Senha"
              placeholder="Sua senha"
              marginBotom={40}
              secureTextEntry={true}
            />
            <Button text="Entrar" onPress={ () => handleSubmit() } />
            <Anchor onPress={() => navigate("SignUp")}>
              <AnchorText>
                Não possui um conta? Crie uma agora mesmo!
              </AnchorText>
            </Anchor>
          </Form>
        </FooterContent>
      </Footer>
    </Container>
  );
}
