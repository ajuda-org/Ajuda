import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";
import Constants from "expo-constants";
import api from "../../../services/api";

import { Button } from "../../../components";

import { useTheme } from "../../../contexts/theme";

const Detail = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color={theme.PrimaryColor} size={20} />
        </TouchableOpacity>
        <View style={{ padding: 10, marginTop: 20, flex: 1, justifyContent: "space-between"}}>
          <View>
            <View style={{height: 100, flexDirection: "row", alignItems: "center"}}>
              <Image style={{width: 80, height: 80, borderRadius: 40}} source={{ uri: `https://api.adorable.io/avatars/80/11`}} />
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 25, color: "#0C2423"}}>Tereza de Jesus</Text>
                  <Text style={{fontSize: 18, color: "#0C2423"}}>4.7</Text>
                </View>
              </View>
            <Text style={{fontSize: 20, color: "#0C2423", marginTop: 20}}>Preciso de ajuda para comprar meus remédios.</Text>
            <Text style={{fontSize: 16, color: "#333", marginTop: 30}}>Olá querido ajudante, estou precisando de ajuda para comprar meus remédios. Não posso sair de casa e eles estão acabando.</Text>
          </View>

          <View style={{width: "100%", marginBottom: 10, justifyContent: "center", alignItems: "center"}}>
            <Button text="Ajudar"/>
          </View>
        </View>
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
  }
});