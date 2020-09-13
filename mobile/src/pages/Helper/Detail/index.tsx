import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";
import Constants from "expo-constants";
import MapView, { Marker, MapEvent } from "react-native-maps";
import api from "../../../services/api";

import { Button, Label, InputLabel, InputTextAreaLabel } from "../../../components";

import { useTheme } from "../../../contexts/theme";

interface Params {
  request_id: number,
}

interface Request {
  id: string;
  title: string;
  description: string;
  owner: {
    id: string;
    name: string;
  }
  latitude: string;
  longitude: string;
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const routeParams = route.params as Params;
  const [request, setRequest] = useState<Request>();

  useEffect(() => {
    api.get(`/requests/${routeParams.request_id}`).then(response => {
      setRequest(response.data);
    });
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color={theme.PrimaryColor} size={20} />
        </TouchableOpacity>
        
          {request && (
            <View style={{ padding: 10, flex: 1, justifyContent: "space-between"}}>
              <View style={{flex: 1}}>
                <View style={{height: 100, flexDirection: "row", alignItems: "center"}}>
                  <Image style={{width: 80, height: 80, borderRadius: 40}} source={{ uri: `https://api.adorable.io/avatars/80/${request.owner.id}`}} />
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 25, color: "#0C2423"}}>{request.owner.name}</Text>
                      <Text style={{fontSize: 18, color: "#0C2423"}}>4.7</Text>
                    </View>
                  </View>
                  <InputLabel
                    editable={false}
                    marginTop={20}
                    label="Título"
                    name="title"
                    placeholder="title"
                    error={{ error: "", field: "" }}
                    value={request.title}
                  />
                  <InputTextAreaLabel
                    editable={false}
                    marginTop={20}
                    label="Descrição"
                    name="description"
                    placeholder="description"
                    error={{ error: "", field: "" }}
                    value={request.description}
                  />
                  <Label marginTop={20}>Endereço</Label>
                  <View style={styles.mapContainer}>
                    <MapView style={styles.map} initialRegion={{ latitude: Number(request.latitude), longitude: Number(request.longitude), latitudeDelta: 0.014, longitudeDelta: 0.014, }}>
                      <Marker identifier={"1"} coordinate={{latitude: Number(request.latitude), longitude: Number(request.longitude)}} />
                    </MapView>
                  </View>
                </View>
              <View style={{width: "100%", marginBottom: 10, justifyContent: "center", alignItems: "center"}}>
                <Button text="Ajudar"/>
              </View>
            </View>
            )
          }
      </View>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 2
  },

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