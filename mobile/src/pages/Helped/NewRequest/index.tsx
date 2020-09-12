import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  AsyncStorage,
  ScrollView,
  View,
  Text,
  FlatList,
  Dimensions
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
  const { theme } = useTheme();
  const [items, setItems] = useState([])
  const [id, setId] = useState([])
  const numberOfFullRows = Math.floor(items.length / 2);
  let numberOfElementsLastRow = items.length - (numberOfFullRows * 2);

  useEffect(() => {
    async function loadInfos() {
      const userId = await AsyncStorage.getItem("userId");
      setId(userId);
      await api
        .get("/items").then((response) => {
            setItems(response.data)
          }).catch(({ response }) => {
            console.log(response)
          }
        )
    }
    loadInfos()
  }, []);

  async function logOut() {
    await AsyncStorage.setItem("userId", "")
    await AsyncStorage.setItem("profile", "")
    navigation.navigate("Landing");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container color={theme.PrimaryColor}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color="#fff" size={20} />
        </TouchableOpacity>
        <TextContainer>
          <Title>Preciso de ajuda com</Title>
        </TextContainer>
        <View style={{flex: 1, marginTop: 10}}>
          <SafeAreaView style={{flex: 1}}>
            <FlatList
              numColumns={2}
              columnWrapperStyle={{ flex: 1, justifyContent: 'space-evenly', }}
              data={items}
              renderItem={({ item }) => (
                <TouchableOpacity style={{ backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', flex: 1, margin: 15, borderRadius: 30, height: Dimensions.get('window').width / 3}}>
                  <SvgUri width={60} height={60} uri={item.image_url} />
                  <Text style={{textAlign: "center", fontSize: 20}}>
                    { item.name }
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
          <ButtonContainer>
            <Button text="Proxímo" color={theme.SecondColor} onPress={() => navigation.navigate("NewRequest")}/>
          </ButtonContainer>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default Requests;
