import React, { useEffect, useState } from "react"
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
  const { navigate } = useNavigation();
  const [totalConnections, setTotalConnections] = useState(128);

  function handleNavigateToGiveClassesPage() {
    navigate("helperLogon");
  }

  function handleNavigateToStudyPages() {
    navigate("helpedLogon");
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
          onPress={handleNavigateToStudyPages}
        >
          <Image source={helpedIcon} />
          <ButtonText>Receber Ajuda</ButtonText>
        </ButtonPrimary>

        <ButtonSecondary
          onPress={handleNavigateToGiveClassesPage}
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