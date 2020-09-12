import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  AsyncStorage
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";
import api from "../../../services/api";
import * as Location from "expo-location";

import { useTheme } from "../../../contexts/theme";

import {
  Container,
  TextContainer,
  Title,
  Description,
  MapContainer,
  Map,
  Marker,
  MapMarkerContainer,
  MapMarkerImage,
  MapMarkerTitle,
  ItemsContainer,
  Items,
  ItemTitle
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

  const [items, setItems] = useState<Item[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [Requests, setRequests] = useState<Request[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    api.get("/items").then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    async function loadPosition() {
      const userName = await AsyncStorage.getItem("name");
      setName(userName);
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Ops!",
          "Precisamos de sua permissão para obeter a localização"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    api
      .get("/requests", {
        params: {
          itemsId: selectedItems,
        },
      })
      .then((response) => {
        setRequests(response.data);
      });
  }, [selectedItems]);

  function handleNavigateToDetail(id: number) {
    navigation.navigate("Detail", { request_id: id });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.includes(id);
    if (alreadySelected) {
      setSelectedItems([
        ...selectedItems.filter((idFiltered) => idFiltered !== id),
      ]);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

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
        <TextContainer>
          <Title>Bem vindo { name }.</Title>
          <Description>
            Selecione o tipo de item que deseja ajudar.
          </Description>
        </TextContainer>
        <MapContainer>
          {initialPosition[0] !== 0 && (
            <Map
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {Requests.map((request) => (
                <Marker
                  key={request.id}
                  onPress={() => handleNavigateToDetail(request.id)}
                  coordinate={{
                    latitude: Number(request.latitude),
                    longitude: Number(request.longitude),
                  }}
                >
                  <MapMarkerContainer color={theme.PrimaryColor}>
                    <MapMarkerImage
                      source={{
                        uri: `https://api.adorable.io/avatars/1200/${request.owner.id}`
                      }}
                    />
                    <MapMarkerTitle>{request.item.name}</MapMarkerTitle>
                  </MapMarkerContainer>
                </Marker>
              ))}
            </Map>
          )}
        </MapContainer>
      </Container>
      <ItemsContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map((item) => (
            <Items
              selected={selectedItems.includes(item.id)}
              color={theme.PrimaryColor}
              key={String(item.id)}
              activeOpacity={0.6}
              onPress={() => handleSelectItem(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <ItemTitle
                color={theme.PrimaryColor}
                selected={selectedItems.includes(item.id)}
              >
                {item.name}
              </ItemTitle>
            </Items>
          ))}
        </ScrollView>
      </ItemsContainer>
    </SafeAreaView>
  );
};

export default Requests;
