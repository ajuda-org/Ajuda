import React from 'react';
import {
  Platform,
  Text,
  StyleSheet
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../../contexts/theme";
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
  const { navigate } = useNavigation();


  return (
    <Container enabled={Platform.OS === 'ios'} behavior="padding">
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
            <InputLabel label="Email" placeholder="Seu email" marginBotom={20}/>
            <InputLabel label="Senha" placeholder="Sua senha" marginBotom={40}/>
            <Button text="Entrar" />
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
