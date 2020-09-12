import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";
import Constants from "expo-constants";
import api from "../../../services/api";

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

const Helps = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color="#34cb79" size={20} />
        </TouchableOpacity>
        <View style={{borderLeftWidth: 5, borderLeftColor: "#54C7C0", padding: 10, marginTop: 20}}>
          <Text style={styles.title}>Pedidos atendidos.</Text>
          <Text style={styles.description}>
            Esses são seus pedidos atendidos.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Helps;

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