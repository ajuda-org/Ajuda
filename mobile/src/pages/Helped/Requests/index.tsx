import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  AsyncStorage,
  ScrollView,
  View,
  Text
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";

import api from "../../../services/api"

import { Button } from "../../../components";

import { useTheme } from "../../../contexts/theme";

import {
  Container,
  TextContainer,
  Title,
  Description,
  ItemContainer,
  ItemTypeContainer,
  ItemContent,
  Date,
  HelpedContainer,
  ImageContainer,
  Image,
  HelpedInfos,
  HelpedName,
  HelpedPoint,
  TextAwait,
  ButtonContainer
} from "./style"

interface Item {
  id: number;
  name: string;
  image_url: string;
}

interface Request {
  id: number;
  title: string;
  image: string;
  latitude: number;
  longitude: number;
  image_url: string;
  item: Item;
}

const Requests = () => {
  const navigation = useNavigation();
  const [requestsOwner, setRequestsOwner] = useState();
  const { theme } = useTheme();

  const [name, setName] = useState("");

  useEffect(() => {
    async function loadInfos() {
      const userName = await AsyncStorage.getItem("name");
      const userId = await AsyncStorage.getItem("userId");
      setName(userName);

      await api
        .get("/owners", {
          params: {
            ownerId: userId,
            status: 0
          }
        })
        .then((response) => {
          console.log(response.data)
          setRequestsOwner(response.data);
        }).catch(({ response }) => {
          console.log(response)
      })
    }
    loadInfos()
  }, [requestsOwner]);

  async function logOut() {
    await AsyncStorage.setItem("userId", "")
    await AsyncStorage.setItem("profile", "")
    navigation.navigate("Landing");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TouchableOpacity onPress={() => logOut()}>
          <Icon name="log-out" color={theme.PrimaryColor} size={20} />
        </TouchableOpacity>
        <TextContainer color={theme.PrimaryColor}>
          <Title>Bem vindo { name }.</Title>
          <Description>
            Esses são pedidos ativos.
          </Description>
        </TextContainer>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            {requestsOwner && requestsOwner.map( request => (
              <ItemContainer key={request.id}>
                <ItemTypeContainer>
                  <SvgUri width={60} height={60} uri={`http://192.168.15.2:3333/uploads/${request.item.image}`} />
                </ItemTypeContainer>
                <ItemContent>
                  <View>
                    <Date>
                    {request.created_at}
                    </Date>

                    <Title>
                      {request.title}
                    </Title>
                  </View>
                  {
                    request.helpers.length > 0 ?
                    (
                      request.helpers.map(helper => (
                        <HelpedContainer key={helper.id}>
                          <ImageContainer>
                            <Image source={{ uri: `https://api.adorable.io/avatars/32/${helper.id}`}} />
                          </ImageContainer>
                          <HelpedInfos>
                            <HelpedName>
                              {helper.name}
                            </HelpedName>
                            <HelpedPoint>
                              4.7
                            </HelpedPoint>
                          </HelpedInfos>
                        </HelpedContainer>
                      ))
                    )
                      :
                      <TextAwait>
                        Aguardando ajuda...
                      </TextAwait>
                  }
                  {}
                </ItemContent>
              </ItemContainer>
            ))}
          </ScrollView>
          <ButtonContainer>
            <Button text="Novo pedido"/>
          </ButtonContainer>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default Requests;
