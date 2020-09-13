import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  AsyncStorage,
  View,
  FlatList,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";
import * as Location from "expo-location";
import MapView, { Marker, MapEvent } from "react-native-maps";

import api from "../../../services/api"

import {
  Button,
  InputLabel,
  InputTextAreaLabel,
  Label
} from "../../../components";

import { useTheme } from "../../../contexts/theme";

import {
  Container,
  TextContainer,
  Title,
  ButtonContainer,
  ItemButton,
  ItemText
} from "./style"

interface Item {
  id: string;
  name: string;
  image_url: string;
}

const Requests = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [items, setItems] = useState<Item[]>([])
  const [itemSelected, setItemSelected] = useState<string>("")
  const [step, setStep] = useState<number>(1)
  const [Positions, setPositions] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    async function loadInfos() {
      const userId = await AsyncStorage.getItem("userId");
      await api
        .get("/items").then((response) => {
            setItems(response.data)
          }).catch(({ response }) => {
            console.log(response)
          }
        )
    }
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Oooops", "Precisamos da sua permissão para obter a localização");
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      
      setPositions([latitude, longitude]);
    }

    loadPosition();
    loadInfos()
  }, []);

  function handleMarkerPress(event: MapEvent) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setPositions([latitude, longitude])
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container color={ step == 1 ? theme.PrimaryColor : "#FFF" }>
        <TouchableOpacity onPress={() => step == 1 ? navigation.goBack() : setStep(1)}>
          <Icon name="arrow-left" color={ step == 1 ? "#fff" : theme.PrimaryColor } size={20} />
        </TouchableOpacity>
        {step == 1 ? 
          (
            <>  
              <TextContainer>
                <Title>Preciso de ajuda com</Title>
              </TextContainer>
              <View style={{flex: 1, marginTop: 10}}>
                <SafeAreaView style={{flex: 1}}>
                  <FlatList
                    numColumns={2}
                    data={items}
                    renderItem={({ item }) => (
                      <ItemButton
                        onPress={ () => itemSelected == item.id ? setItemSelected("") : setItemSelected(item.id)}
                        selected={itemSelected == item.id}>
                        <SvgUri width={60} height={60} uri={item.image_url} />
                        <ItemText selected={itemSelected == item.id}>
                          { item.name }
                        </ItemText>
                      </ItemButton>
                    )}
                    keyExtractor={item => item.id}
                  />
                </SafeAreaView>
                <ButtonContainer>
                  <Button disabled={!itemSelected} text="Proxímo" color={theme.SecondColor} onPress={() => setStep(2)}/>
                </ButtonContainer>
              </View>
            </>
          )
          : (
            <View style={{flex: 1}}>
              <ScrollView>
                <InputLabel label="Título" placeholder="Informe o título do pedido" name="title" error={{ error: "", field: "" }} marginTop={20}/>
                <InputTextAreaLabel
                  label="Descrição"
                  placeholder="Informe a descrição do pedido"
                  name="Description"
                  error={{ error: "", field: "" }}
                  marginTop={20}
                />
                <Label marginTop={20}>Sua localização</Label>
                <View style={styles.mapContainer}>
                  { Positions[0] !== 0 && (
                    <MapView onPress={(event) => handleMarkerPress(event)} style={styles.map} initialRegion={{latitude: Positions[0], longitude: Positions[1], latitudeDelta: 0.014, longitudeDelta: 0.014, }}>
                      <Marker identifier={"1"} coordinate={{latitude: Positions[0], longitude: Positions[1]}} />
                    </MapView>
                  ) }
                </View>
              </ScrollView>

              <ButtonContainer>
                <Button text="Cadastrar" color={theme.SecondColor} onPress={() => console.log(step)}/>
              </ButtonContainer>
            </View>
          )
        }
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  mapContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 4,
    marginBottom: 20,
  },

  map: {
    width: "100%",
    height: Dimensions.get("screen").width / 1.2,
  },
});

export default Requests;
