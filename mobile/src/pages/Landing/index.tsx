import React, { useEffect, useState } from "react"
import { Image, AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useProfile } from "../../contexts/profile";

import {
  Container,
  Banner,
  Title,
  TitleBold,
  ButtonsContainer,
  ButtonPrimary,
  ButtonSecondary,
  ButtonText,
  TotalConnections
} from "./styles";

import landingImg from "../../assets/images/landing.png";
import helpedIcon from "../../assets/images/icons/helped.png";
import helperIcon from "../../assets/images/icons/helper.png";
import heartIcon from "../../assets/images/icons/heart.png";

function Landing() {
  const { profile, setProfile } = useProfile();
  const { navigate } = useNavigation();
  const [totalConnections, setTotalConnections] = useState(128);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(async id => {
      const profile = await AsyncStorage.getItem('profile')
      if ( id && profile ) {
        return handleNavigateToHome(profile);
      }
    })

  }, [])

  async function handleNavigateToHome(profile :string) {
    navigate(profile);
  }

  async function handleNavigateToHelperWelcome() {
    setProfile("Helper");
    await AsyncStorage.setItem("profile","Helper");
    navigate("Welcome");
  }

  async function handleNavigateToHelpedWelcome() {
    setProfile("Helped");
    await AsyncStorage.setItem("profile","Helped");
    navigate("Welcome");
  }

  return (
    <Container>
      <Banner source={landingImg}/>

      <Title>
        Seja bem-vindo,
      </Title>
      <TitleBold>
        O que você deseja fazer?
      </TitleBold>

      <ButtonsContainer>
        <ButtonPrimary
          onPress={handleNavigateToHelpedWelcome}
        >
          <Image source={helpedIcon} />
          <ButtonText>Receber Ajuda</ButtonText>
        </ButtonPrimary>

        <ButtonSecondary
          onPress={handleNavigateToHelperWelcome}
        >
          <Image source={helperIcon} />
          <ButtonText>Ajudar</ButtonText>
        </ButtonSecondary>
      </ButtonsContainer>

      <TotalConnections>
        Já conectamos um total de {totalConnections} pessoas {" "}
        <Image source={heartIcon} />
      </TotalConnections>
    </Container>
  )
}

export default Landing;